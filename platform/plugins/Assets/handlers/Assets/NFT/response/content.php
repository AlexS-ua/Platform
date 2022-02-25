<?php
function Assets_NFT_response_content ($params) {
	$loggedInUser = Users::loggedInUser();
	$request = array_merge($_REQUEST, $params);
	$uri = Q_Dispatcher::uri();
	$tokenId = Q::ifset($r, 'tokenId', Q::ifset($uri, 'tokenId', null));
	$chainId = Q::ifset($r, 'chainId', Q::ifset($uri, 'chainId', null));

	$needle = ".json";
	$isJson = substr_compare($chainId, $needle, -strlen($needle)) === 0;
	if ($isJson) {
		$chainId = str_replace($needle, "", $chainId);
	}

	if (empty($tokenId)) {
		throw new Exception("NFT::view tokenId required!");
	}
	if (empty($chainId)) {
		throw new Exception("NFT::view chainId required!");
	}

    $communityId = Users::communityId();
    $texts = Q_Text::get('Assets/content');

	$url = implode("/", array(Q_Request::baseUrl(), "NFT", $tokenId, $chainId));
	$nftInfo = Q::event("Assets/NFT/response/getInfo", compact("tokenId", "chainId"));
	if ($isJson) {
		header("Content-type: application/json");
		echo Q::json_encode(array(
			"name" => $nftInfo["data"]["name"],
			"description" => $nftInfo["data"]["description"],
			"external_url" => $url,
			"image" => $nftInfo["data"]["image"],
			"animation_url" => $nftInfo["data"]["animation_url"],
			"attributes" => $nftInfo["data"]["attributes"]
		), JSON_PRETTY_PRINT);
		exit;
	}

	$user = Users_ExternalTo::select()->where(array(
		"xid" => $nftInfo["owner"]
	))->fetchDbRow();
	$ownerId = Q::ifset($user, "userId", null);
	$ownerId = null;

	$defaultIconSize = Q_Config::expect("Q", "images", "NFT/icon", "defaultSize");
	$sizes = Q_Config::expect("Q", "images", "NFT/icon", "sizes");
	$maxSize = end($sizes);

	Q_Response::addScript("{{Assets}}/js/pages/NFT.js");
	Q_Response::addStylesheet("{{Assets}}/css/pages/NFT.css");

	$keywords = Q::ifset($texts, 'profile', 'Keywords', null);
	Q_Response::setMeta(array(
		array('attrName' => 'name', 'attrValue' => 'title', 'content' => $nftInfo["data"]["name"]),
		array('attrName' => 'property', 'attrValue' => 'og:title', 'content' => $nftInfo["data"]["name"]),
		array('attrName' => 'property', 'attrValue' => 'twitter:title', 'content' => $nftInfo["data"]["name"]),
		array('attrName' => 'name', 'attrValue' => 'description', 'content' => $nftInfo["data"]["description"]),
		array('attrName' => 'property', 'attrValue' => 'og:description', 'content' => $nftInfo["data"]["description"]),
		array('attrName' => 'property', 'attrValue' => 'twitter:description', 'content' => $nftInfo["data"]["description"]),
		array('attrName' => 'name', 'attrValue' => 'keywords', 'content' => $keywords),
		array('attrName' => 'property', 'attrValue' => 'og:keywords', 'content' => $keywords),
		array('attrName' => 'property', 'attrValue' => 'twitter:keywords', 'content' => $keywords),
		array('attrName' => 'name', 'attrValue' => 'image', 'content' => $nftInfo["data"]["image"]),
		array('attrName' => 'property', 'attrValue' => 'og:image', 'content' => $nftInfo["data"]["image"]),
		array('attrName' => 'property', 'attrValue' => 'twitter:image', 'content' => $nftInfo["data"]["image"]),
		array('attrName' => 'property', 'attrValue' => 'og:url', 'content' => $url),
		array('attrName' => 'property', 'attrValue' => 'twitter:url', 'content' => $url),
		array('attrName' => 'property', 'attrValue' => 'twitter:card', 'content' => 'summary')
	));

	return Q::view('Assets/content/NFT.php', compact("texts", "defaultIconSize", "maxSize", "tokenId", "chainId", "nftInfo", "ownerId"));
}