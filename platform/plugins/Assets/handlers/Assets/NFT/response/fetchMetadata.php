<?php
function Assets_NFT_response_fetchMetadata ($params) {
	Q_Valid::nonce(true);

	$request = array_merge($_REQUEST, $params);
	$tokenId = Q::ifset($request, "tokenId", null);
	$chainId = Q::ifset($request, "chainId", null);
	$contractAddress = Q::ifset($request, "contractAddress", null);
	$tokenURI = Q::ifset($request, "tokenURI", null);
	$ABI = Q::ifset($request, "ABI", null);
	$pathABI = Q::ifset($request, 'pathABI', "Assets/templates/R1/NFT/contract");
	$longDuration = 31104000;

	if ($tokenURI) {
		$dataJson = Assets_NFT::fetchMetadata($tokenURI);
	} elseif ($tokenId && $chainId && $contractAddress) {
		$ABI = Q::ifset($ABI, Users_Web3::getABI($pathABI));

		// execute tokenURI if exists
		if (Users_Web3::existsInABI("tokenURI", $ABI, "function", false)) {
			$tokenURI = Users_Web3::execute($pathABI, $contractAddress, "tokenURI", $tokenId, $chainId, true, $longDuration);
		} else {
			throw new Exception("not found tokenURI method in ABI of contract ".$contractAddress);
		}

		$dataJson = Assets_NFT::metadata($chainId, $contractAddress, $tokenURI);
	} else {
		throw new Exception("Required params omitted");
	}

	return $dataJson;
}