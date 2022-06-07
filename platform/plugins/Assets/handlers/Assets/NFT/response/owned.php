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
	$loggedInUser = Users::loggedInUser();
	$request = array_merge($_REQUEST, $params);
	$userId = Q::ifset($request, 'userId', $loggedInUser->id);
	$glob["Assets_NFT_response_owned"] = array();
	$glob["Assets_NFT_response_owned"]["offset"] = (int)Q::ifset($request, 'offset', 0);
	$glob["Assets_NFT_response_owned"]["limit"] = (int)Q::ifset($request, 'limit', 1000);
	$countNFTs = 0;
	$glob["Assets_NFT_response_owned"]["secondsInYear"] = 31104000;
	$tokensByOwnerLimit = Q_Config::get("Assets", "NFT", "methods", "tokensByOwner", "limit", 100);

	$chains = Assets_NFT::getChains();
	$wallet = Users_Web3::getWalletById($userId, true);
	$tokenJSON = array();

	$_Assets_NFT_response_owned_json = function ($tokenId, $chain, &$tokenJSON, &$countNFTs) use($glob) {
		try {
			$tokenURI = Users_Web3::execute($chain["contract"], "tokenURI", $tokenId, $chain["chainId"], true, $glob["Assets_NFT_response_owned"]["secondsInYear"]);

			// try to request token URI, if response if not valid json - continue
			$dataJson = Assets_NFT::metadata($chain["chainId"], $chain["contract"], $tokenURI);
		} catch (Exception $e) {
			return null;
		}

		$countNFTs++;

		if ($countNFTs <= $glob["Assets_NFT_response_owned"]["offset"]) {
			return null;
		} elseif ($countNFTs > $glob["Assets_NFT_response_owned"]["offset"] + $glob["Assets_NFT_response_owned"]["limit"]) {
			return false;
		}

		$tokenJSON[] = array(
			"tokenId" => $tokenId,
			"chainId" => $chain["chainId"],
			"data" => $dataJson
		);

		return null;
	};

	// get tokens by owner
	foreach ($chains as $chain) {
		if (empty($chain["contract"])) {
			continue;
		}

		//TODO: use balanceOf and tokenOfOwnerByIndex if method tokensByOwner absent

		try {
			$tokens = Users_Web3::execute($chain["contract"], "tokensByOwner", [$wallet, $tokensByOwnerLimit], $chain["chainId"]);
		} catch (Exception $e) {
			continue;
		}

		if (empty($tokens)) {
			continue;
		}

		foreach ($tokens as $tokenId) {
			if ($_Assets_NFT_response_owned_json($tokenId, $chain, $tokenJSON, $countNFTs) === false){
				break;
			}
		}
	}

	return $tokenJSON;
}