<?php
function Assets_NFT_post ($params) {
	$req = array_merge($_REQUEST, $params);
	$loggedInUserId = Users::loggedInUser(true)->id;
	$userId = Q::ifset($req, "userId", $loggedInUserId);
	$adminLabels = Q_Config::get("Assets", "canCheckPaid", null);
	if (!(bool)Users::roles(null, $adminLabels, array(), $loggedInUserId)) {
		throw new Users_Exception_NotAuthorized();
	}

	// update NFT attributes
	if (Q_Request::slotName("attrUpdate")) {
		$attribute = new Assets_NftAttributes();
		$attribute->publisherId = $req["publisherId"];
		$attribute->display_type = $req["display_type"];
		$attribute->trait_type = $req["trait_type"];
		$attribute->value = $req["value"];
		if (!$attribute->retrieve()) {
			$attribute->save();
		}

		Q_Response::setSlot('attrUpdate', true);
		return;
	}

	$stream = Assets_NFT::getComposerStream($userId);
	$fields = Q::take($req, array('title', 'content', 'attributes', 'interests'));

	Assets_NFT::updateNFT($stream, $fields);
}