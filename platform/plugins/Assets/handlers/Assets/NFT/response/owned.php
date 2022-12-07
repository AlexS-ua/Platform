<?php
/**
 * Get all tokens user owned in all chains (means chains registered in config)
 * @class HTTP Assets NFT owned
 * @method owned
 * @param {array} [$_REQUEST]
 *   @param {string} $_REQUEST.userId
 *   @param {string} $_REQUEST.offset
 *   @param {string} $_REQUEST.limit
 * @return {void}
 */
function Assets_NFT_response_owned ($params) {
	$request = array_merge($_REQUEST, $params);
	$sources = array();
	$ownerUserId = Q::ifset($request, "owner", "userId", null);
	$ownerAccountAddress = Q::ifset($request, "owner", "accountAddress", null);
	if (!$ownerAccountAddress && $ownerUserId) {
		$ownerAccountAddress = Users_Web3::getWalletByUserId($ownerUserId);
	}
	$sources[] = array(
		"address" => $ownerAccountAddress,
	);
	// $sources[] = array(
	// 	"address" => Q::ifset($request,"holder", "contractAddress", null),
	// 	"pathABI" => Q::ifset($request,"holder", "pathABI", "Assets/templates/R1/NFT/sales/contract"),
	// 	"recipient" => Q::ifset($request,"holder", "accountAddress", Users_Web3::getWalletByUserId())
	// );
	$pathABI = Q::ifset($request, "pathABI", "Assets/templates/R1/NFT/contract");
	$glob = array();
	$glob["offset"] = (int)Q::ifset($request, "offset", 0);
	$glob["limit"] = (int)Q::ifset($request, "limit", 1000);
	$countNFTs = 0;
	$glob["secondsInYear"] = 31104000;
	$tokensByOwnerLimit = Q_Config::get("Assets", "NFT", "methods", "tokensByOwner", "limit", 100);

	$chains = Assets_NFT::getChains();
	$chainId = Q::ifset($request, "chainId", null);
	$contractAddress = Q::ifset($request, "contractAddress", null);
	$glob["skipInfo"] = Q::ifset($request, "skipInfo", false);
	$glob["skipException"] = Q::ifset($request, "skipException", false);
	$glob["updateCache"] = filter_var(Q::ifset($request, "updateCache", false), FILTER_VALIDATE_BOOLEAN);
	if ($glob["updateCache"]) {
		$caching = null;
		$cacheDuration = 0;
	} else {
		$caching = true;
		$cacheDuration = null;
	}

	$tokenJSON = array();

	$_Assets_NFT_response_owned_json = function ($params, &$tokenJSON, &$countNFTs) use($glob) {
		$tokenId = $params["tokenId"];
		$chain = $params["chain"];
		$ABI = $params["ABI"];
		$secondsLeft = Q::ifset($params, "secondsLeft", null);
		$dataJson = compact("tokenId", "secondsLeft");
		if ($glob["skipInfo"]) {
			$tokenJSON[] = $dataJson;
			return null;
		}

		try {
			$dataJson = array_merge($dataJson, Q::event("Assets/NFT/response/getInfo", array(
				"tokenId" => $tokenId,
				"chainId" => $chain["chainId"],
				"contractAddress" => $chain["contract"],
				"ABI" => $ABI,
				"updateCache" => $glob["updateCache"]
			)));
		} catch (Exception $e) {
			$tokenJSON[] = $dataJson;
			return null;
		}

		$countNFTs++;

		if ($countNFTs <= $glob["offset"]) {
			return null;
		} elseif ($countNFTs > $glob["offset"] + $glob["limit"]) {
			return false;
		}

		$tokenJSON[] = $dataJson;
		return null;
	};

	// get tokens by owner
	foreach ($chains as $chain) {
		if ($chainId) {
			if ($chainId != $chain["chainId"]) {
				continue;
			}

			if ($contractAddress) {
				$chain["contract"] = $contractAddress;
			}
		}

		if (empty($chain["contract"])) {
			continue;
		}

		$ABI = Users_Web3::getABI($pathABI);
		$tokensByOwner = Users_Web3::existsInABI("tokensByOwner", $ABI, "function", false);
		$balanceOf = Users_Web3::existsInABI("balanceOf", $ABI, "function", false);
		$getNftsByOwner = Users_Web3::existsInABI("getNftsByOwner", $ABI, "function", false);
		$tokenOfOwnerByIndex = Users_Web3::existsInABI("tokenOfOwnerByIndex", $ABI, "function", false);
		foreach ($sources as $source) {
			if (empty($source["address"])) {
				continue;
			}
			if ($tokensByOwner || $getNftsByOwner) {
				$methodName = "tokensByOwner";
				if ($getNftsByOwner) {
					$methodName = "getNftsByOwner";
				}

				$tokens = Users_Web3::execute($pathABI, $chain["contract"], $methodName, [$source["address"], $tokensByOwnerLimit], $chain["chainId"], $caching, $cacheDuration);
				if (empty($tokens)) {
					continue;
				}
				if ($source["recipient"]) {
					$dirtyTokens = $tokens;
					$tokens = array();
					$sourceABI = Users_Web3::getABI($source["pathABI"]);
					$tokenInfo = Users_Web3::existsInABI("tokenInfo", $sourceABI, "function", false);
					if ($tokenInfo) {
						foreach ($dirtyTokens as $tokenId) {
							$tokenInfo = Users_Web3::execute($source["pathABI"], $source["address"], "pending", [$tokenId], $chain["chainId"], $caching, $cacheDuration);
							if (Q::ifset($tokenInfo, "recipient", null) == $source["recipient"]) {
								$secondsLeft = Q::ifset($tokenInfo, "secondsLeft", null);
								if (isset($secondsLeft)) {
									$secondsLeft = (integer)$secondsLeft;
								}
								$tokens[] = array(
									"tokenId" => $tokenId,
									"secondsLeft" => $secondsLeft
								);
							}
						}
					} else {
						$tokens = array();
					}
				}

				foreach ($tokens as $tokenId) {
					$secondsLeft = null;
					if (is_array($tokenId)) {
						$secondsLeft = Q::ifset($tokenId, "secondsLeft", null);
						$tokenId = Q::ifset($tokenId, "tokenId", null);
					}
					if ($_Assets_NFT_response_owned_json(compact("tokenId", "chain", "ABI", "secondsLeft"), $tokenJSON, $countNFTs) === false) {
						break;
					}
				}
			} elseif ($balanceOf && $tokenOfOwnerByIndex) {
				$tokens = (int)Users_Web3::execute($source["pathABI"], $chain["contract"], "balanceOf", $source["address"], $chain["chainId"], $caching, $cacheDuration);
				for ($i = 0; $i < $tokens; $i++) {
					$tokenId = (int)Users_Web3::execute($source["pathABI"], $chain["contract"], "tokenOfOwnerByIndex", array($source["address"], $i), $chain["chainId"], $caching, $cacheDuration);
					if ($_Assets_NFT_response_owned_json(compact("tokenId", "chain", "ABI"), $tokenJSON, $countNFTs) === false) {
						break;
					}
				}
			} else {
				throw new Exception("Contract ".$chain["contract"]." doesn't support methods tokensByOwner and ".($balanceOf ? "tokenOfOwnerByIndex" : "balanceOf"));
			}
		}
	}

	return $tokenJSON;
}