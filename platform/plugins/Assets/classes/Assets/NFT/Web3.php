<?php

/**
 * @module Assets
 */
/**
 * Methods for manipulating "Assets/NFT" streams
 * @class Assets_NFT
 */
class Assets_NFT_Web3 extends Users_Web3
{
	static $categoryStreamName = "Assets/user/NFTs";

    /**
	 * Check if NFT category exists, and create if not
	 * @method category
	 * @param {string} [$publisherId=null] If null - logged user id used.
	 */
	static function category($publisherId=null)
	{
		if ($publisherId === null) {
			$publisherId = Users::loggedInUser(true)->id;
		}
		if (empty($publisherId)) {
			throw new Q_Exception_WrongValue(array(
				'field' => 'publisherId',
				'range' => 'nonempty'
			));
		}

		$stream = Streams::fetchOne($publisherId, $publisherId, self::$categoryStreamName);
		if (!$stream) {
			Streams::create(null, $publisherId, 'Streams/category', array('name' => self::$categoryStreamName));
		}

		if ($stream->getAttribute('Assets/NFT/minted/total', null) === null) {
			$stream->setAttribute('Assets/NFT/minted/total', 0);
			$stream->changed();
		}

		return $stream;
	}

	/**
	 * Get or create new NFT empty stream for composer
	 * This is for user creating new NFT streams in the interface
	 * @method getNFTStream
	 * @param {string} [$userId=null] If null loggedin user id used
	 * @return {Streams_Stream}
	 */
	static function getNFTStream ($userId = null) {
		$userId = $userId ?: Users::loggedInUser(true)->id;
		$category = self::category($userId);

		$streams = Streams::related($userId, $userId, $category->name, true, array(
			"type" => "new",
			"streamsOnly" => true,
			"ignoreCache" => true
		));

		if (empty($streams)) {
			$stream = Streams::create($userId, $userId, "Assets/NFT", array(), array(
				"publisherId" => $userId,
				"streamName" => $category->name,
				"type" => "new"
			));
			$stream->join(compact("userId"));
			return $stream;
		} else {
			return reset($streams);
		}
	}

	/**
	 * Updated NFT stream with new data
	 * @method updateNFT
	 * @param {Streams_Stream} $stream NFT stream
	 * @param {array} $fields Array of data to update stream
	 * @return {Streams_Stream}
	 */
	static function updateNFT ($stream, $fields) {
		$communityId = Users::communityId();
		$userId = Users::loggedInUser(true)->id;

		$fieldsUpdated = false;
		foreach (array("title", "content") as $field) {
			if (!Q::ifset($fields, $field)) {
				continue;
			}

			$stream->{$field} = $fields[$field];
			$fieldsUpdated = true;
		}

		// update attributes
		if (Q::ifset($fields, "attributes")) {
			if ($stream->attributes) {
				$attributes = (array)Q::json_decode($stream->attributes);
			} else {
				$attributes = array();
			}
			$stream->attributes = Q::json_encode(array_merge($attributes, $fields["attributes"]));
		}

		if ($fieldsUpdated) {
			$stream->save();
		}

		$interestsRelationType = "NFT/interest";
		// remove relations
		$relateds = Streams_RelatedTo::select()->where(array(
			"type" => $interestsRelationType,
			"fromPublisherId" => $stream->publisherId,
			"fromStreamName" => $stream->name
		))->fetchDbRows();
		foreach ($relateds as $related) {
			Streams::unrelate($userId, $related->toPublisherId, $related->toStreamName, $interestsRelationType, $stream->publisherId, $stream->name);
		}

		if (!empty(Q::ifset($fields, "interests", null))) {
			foreach ($fields["interests"] as $key => $interest) {
				$interestStream = Streams::getInterest(trim($interest));
				$fields["interests"][$key] = $interestStream->name;
			}

			// relate to interests
			Streams::relate($userId, $communityId, $fields["interests"], $interestsRelationType, $stream->publisherId, $stream->name);
		}

		// change stream relation
		Streams::unrelate($userId, $stream->publisherId, self::$categoryStreamName, "new", $stream->publisherId, $stream->name);
		Streams::relate($userId, $stream->publisherId, self::$categoryStreamName, "NFT", $stream->publisherId, $stream->name, array("weight" => time()));

		//$onMarketPlace = Q::ifset($fields, "attributes", "onMarketPlace", null);
		//if ($onMarketPlace == "true") {
		// relate to main category
		Streams::relate($userId, $communityId, "Assets/NFTs", "NFT", $stream->publisherId, $stream->name, array("weight" => time()));
		//} elseif ($onMarketPlace == "false") {
		// unrelate from main category
		//	Streams::unrelate($userId, $communityId, "Assets/NFTs", "NFT", $stream->publisherId, $stream->name);
		//}

		return $stream;
	}

	/**
	 * Get tokens by author
	 * @method tokensByAuthor
	 * @static
	 * @param {String} $address Author wallet address
	 * @param {String} $chainId
	 * @param {Boolean} [$updateCache=false] If true request blockchain to update cache
	 * @return array
	 */
	static function tokensByAuthor ($address, $chainId, $updateCache=false) {
		self::construct($chainId);
		$network = self::$networks[$chainId];
		return self::execute($network["contract"], __FUNCTION__, $address, null, !$updateCache);
	}

	/**
	 * Get comission info by token
	 * @method commissionInfo
	 * @static
	 * @param {String} $tokenId
	 * @param {String} $chainId
	 * @param {Boolean} [$updateCache=false] If true request blockchain to update cache
	 * @return array
	 */
	static function commissionInfo ($tokenId, $chainId, $updateCache=false) {
		self::construct($chainId);
		$network = self::$networks[$chainId];
		$data = self::execute($network["contract"],"getCommission", $tokenId, null, !$updateCache);
		$data["value"] = gmp_intval(Q::ifset($data, "r", "value", null));

		return $data;
	}

	/**
	 * Get tokens by owner
	 * @method tokensByOwner
	 * @static
	 * @param {String} $address Owner wallet address
	 * @param {String} $chainId
	 * @param {Boolean} [$updateCache=false] If true request blockchain to update cache
	 * @return array
	 */
	static function tokensByOwner ($address, $chainId, $updateCache=false) {
		self::construct($chainId);
		$network = self::$networks[$chainId];
		return self::execute($network["contract"],__FUNCTION__, $address, null, !$updateCache);
	}

	/**
	 * Get author of token
	 * @method authorOf
	 * @static
	 * @param {String} $tokenId
	 * @param {String} $chainId
	 * @param {Boolean} [$updateCache=false] If true request blockchain to update cache
	 * @return array
	 */
	static function authorOf ($tokenId, $chainId, $updateCache=false) {
		self::construct($chainId);
		$network = self::$networks[$chainId];
		return self::execute($network["contract"],__FUNCTION__, $tokenId, null, !$updateCache);
	}

	/**
	 * Get owner of token
	 * @method ownerOf
	 * @static
	 * @param {String} $tokenId
	 * @param {String} $chainId network symbol
	 * @param {Boolean} [$updateCache=false] If true request blockchain to update cache
	 * @return array
	 */
	static function ownerOf ($tokenId, $chainId, $updateCache=false) {
		self::construct($chainId);
		$network = self::$networks[$chainId];
		return self::execute($network["contract"],__FUNCTION__, $tokenId, null, !$updateCache);
	}

	/**
	 * Get sale info by token
	 * @method saleInfo
	 * @static
	 * @param {String} $tokenId
	 * @param {String} $chainId
	 * @param {Boolean} [$updateCache=false] If true request blockchain to update cache
	 * @return array
	 */
	static function saleInfo ($tokenId, $chainId, $updateCache=false) {
		self::construct($chainId);
		$network = self::$networks[$chainId];
		$data = self::execute($network["contract"],__FUNCTION__, $tokenId, null, !$updateCache);
		$data[1] = gmp_intval(Q::ifset($data, 1, "value", null));
		return $data;
	}

	/**
	 * Get currency by chainId and currency token
	 * @method getCurrencyByChain
	 * @static
	 * @param {String} $chainId
	 * @param {String} $currencyToken currency token
	 * @return array
	 */
	static function getCurrencyByChain ($chainId, $currencyToken) {
		$currencies = Q_Config::expect("Assets", "NFT", "currencies");
		foreach ($currencies as $currency) {
			if ($currency[$chainId] == $currencyToken) {
				return $currency;
			}
		}
	}

	/**
	 * Get available blockchain networks info (contact address, currency, rpcUrl, blockExplorerUrl)
	 * @method getChains
	 * @param {string} [$needChainId] if defined return only this chain info
	 * @static
	 * @return array
	 */
	static function getChains ($needChainId=null) {
		$chains = Q_Config::get("Users", "apps", "web3", array());
		$currencies = Q_Config::get("Assets", "NFT", "currencies", array());
		$chainsClient = array();
		foreach ($chains as $i => $chain) {
			// if contract or rpcUrls undefined, skip this chain
			$contract = Q::ifset($chain, "contracts", "NFT", "address", null);
			$rpcUrl = Q::ifset($chain, "rpcUrl", null);
			$infuraId = Q::ifset($chain, "providers", "walletconnect", "infura", "projectId", null);
			$blockExplorerUrl = Q::ifset($chain, "blockExplorerUrl", null);
			$chainId = Q::ifset($chain, "appId", null);

			if (!$contract || !$rpcUrl) {
				unset($chain[$i]);
				continue;
			}

			$rpcUrl = Q::interpolate($rpcUrl, compact("infuraId"));
			$temp = compact("chainId", "contract", "rpcUrl", "blockExplorerUrl");

			foreach ($currencies as $currency) {
				if ($currency[$chainId] == "0x0000000000000000000000000000000000000000") {
					$temp["currency"] = $currency;
					$temp["currency"]["token"] = $currency[$chainId];
					break;
				}
			}

			$temp["default"] = $i == Users::communityId();

			if ($needChainId && $chainId == $needChainId) {
				return $temp;
			}

			$chainsClient[$chainId] = $temp;
		}

		return $chainsClient;
	}

	/**
	 * Get sale info by token
	 * @method saleInfo
	 * @static
	 * @param {String} $tokenId
	 * @param {String} $chainId
	 * @param {Boolean} [$updateCache=false] If true request blockchain to update cache
	 * @return array
	 */
	static function getSaleInfo ($tokenId, $chainId, $updateCache=false) {
		self::construct($chainId);
		$network = self::$networks[$chainId];
		$data = self::execute($network["contract"],__FUNCTION__, $tokenId, null, !$updateCache);
		$data[1] = gmp_intval(Q::ifset($data, 1, "value", null));
		return $data;
	}
};