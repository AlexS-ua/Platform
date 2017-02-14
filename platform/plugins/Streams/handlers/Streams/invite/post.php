<?php

/**
 * Invites a user (or a future user) to a stream .
 * @param {array} $_REQUEST
 * @param {string} $_REQUEST.publisherId The id of the stream publisher
 * @param {string} $_REQUEST.streamName The name of the stream the user will be invited to
 *  @param {string} [$_REQUEST.userId] user id or an array of user ids
 *  @param {string} [$_REQUEST.fb_uid] fb user id or array of fb user ids
 *  @param {string} [$_REQUEST.label]  label or an array of labels, or tab-delimited string
 *  @param {string} [$_REQUEST.identifier] identifier or an array of identifiers
 *  @param {string|array} [$_REQUEST.addLabel] label or an array of labels for adding publisher's contacts
 *  @param {string|array} [$_REQUEST.addMyLabel] label or an array of labels for adding logged-in user's contacts
 *  @param {string} [$_REQUEST.readLevel] the read level to grant those who are invited
 *  @param {string} [$_REQUEST.writeLevel] the write level to grant those who are invited
 *  @param {string} [$_REQUEST.adminLevel] the admin level to grant those who are invited
 *	@param {string} [$_REQUEST.displayName] optionally override the name to display in the invitation for the inviting user
 * @see Users::addLink()
 */
function Streams_invite_post()
{
	$publisherId = Streams::requestedPublisherId(true);
	$streamName = Streams::requestedName(true);

	Streams::$cache['invite'] = Streams::invite(
		$publisherId, 
		$streamName, 
		$_REQUEST, 
		$_REQUEST
	);
	
	Q_Response::setSlot('data', Streams::$cache['invite']);
}
