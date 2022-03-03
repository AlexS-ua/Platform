<?php
function Assets_NFT_response_owned ($params) {
	$loggedInUser = Users::loggedInUser();
	$request = array_merge($_REQUEST, $params);
	$userId = Q::ifset($request, 'userId', $loggedInUser->id);
	$GLOBALS["Assets_NFT_response_owned"] = array();
	$GLOBALS["Assets_NFT_response_owned"]["offset"] = (int)Q::ifset($request, 'offset', 0);
	$GLOBALS["Assets_NFT_response_owned"]["limit"] = (int)Q::ifset($request, 'limit', 1000);
	$countNFTs = 0;
	$GLOBALS["Assets_NFT_response_owned"]["secondsInYear"] = 31104000;

	$chains = Assets_NFT::getChains();
	$wallet = Users_Web3::getWalletById($userId, true);
	$tokenJSON = array();

	function _Assets_NFT_response_owned_json ($tokenId, $chain, &$tokenJSON, &$countNFTs) {
		try {
			$tokenURI = Users_Web3::execute($chain["contract"], "tokenURI", $tokenId, $chain["chainId"], true, $GLOBALS["Assets_NFT_response_owned"]["secondsInYear"]);

			// try to request token URI, if response if not valid json - continue
			$dataJson = Assets_NFT::getJson($chain["chainId"], $chain["contract"], $tokenURI);
		} catch (Exception $e) {
			return null;
		}

		$countNFTs++;

		if ($countNFTs <= $GLOBALS["Assets_NFT_response_owned"]["offset"]) {
			return null;
		} elseif ($countNFTs > $GLOBALS["Assets_NFT_response_owned"]["offset"] + $GLOBALS["Assets_NFT_response_owned"]["limit"]) {
			return false;
		}

		$tokenJSON[] = array(
			"tokenId" => $tokenId,
			"chainId" => $chain["chainId"],
			"data" => $dataJson
		);

		return null;
	}

	// get tokens by owner
	foreach ($chains as $chain) {
		if (Users_Web3::existsInABI("tokensByOwner", $chain["contract"], "function")) {
			try {
				$tokens = Users_Web3::execute($chain["contract"], "tokensByOwner", [$wallet, 100], $chain["chainId"]);
			} catch (Exception $e) {
				continue;
			}

			if (empty($tokens)) {
				continue;
			}

			foreach ($tokens as $tokenId) {
				if (_Assets_NFT_response_owned_json($tokenId, $chain, $tokenJSON, $countNFTs) === false){
					break;
				}
			}
		} else {
			$tokens = (int)Users_Web3::execute($chain["contract"], "balanceOf", $wallet, $chain["chainId"]);
			for ($i = 0; $i < $tokens; $i++) {
				$tokenId = (int)Users_Web3::execute($chain["contract"], "tokenOfOwnerByIndex", array($wallet, $i), $chain["chainId"], true, $GLOBALS["Assets_NFT_response_owned"]["secondsInYear"]);
				if (_Assets_NFT_response_owned_json($tokenId, $chain, $tokenJSON, $countNFTs) === false) {
					break;
				}
			}
		}
	}

	return $tokenJSON;
}