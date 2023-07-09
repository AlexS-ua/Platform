<?php

function Streams_message_response_messages()
{
	if (isset(Streams::$cache['extras'])) {
		Q_Response::setSlot('extras', Streams::$cache['extras']);
	}
	if (isset(Streams::$cache['message'])) {
		$message = Streams::$cache['message'];
		return Db::exportArray(array($message->ordinal => $message));
	}
	if (isset(Streams::$cache['messages'])) {
		return Db::exportArray(Streams::$cache['messages']);
	}
	
	$publisherId = Streams::requestedPublisherId(true);
	$streamName = Streams::requestedName(true);
	$messageType = Streams::requestedMessageType();
	$withMessageTotals = Q::ifset($_REQUEST, 'withMessageTotals', null);
	if ($withMessageTotals and !is_array($withMessageTotals)) {
		throw new Q_Exception_WrongType(array('withMessageTotals' => 'array'));
	}
	$o = $withMessageTotals ? @compact('withMessageTotals') : array();
	$stream = Q::ifset(Streams::$cache, 'stream', 
		Streams_Stream::fetch(null, $publisherId, $streamName, true, $o)
	);
	if (!$stream->testReadLevel('messages')) {
		throw new Users_Exception_NotAuthorized();
	}
	$maxLimit = Streams_Stream::getConfigField($messageType, 'getMessagesLimit', 100);
	$limit = min($maxLimit, Q::ifset($_REQUEST, 'limit', $maxLimit));
	if (isset($_REQUEST['ordinal'])) {
		$min = $_REQUEST['ordinal'];
		$limit = 1;
	}
	if (isset($_REQUEST['min'])) {
		$min = $_REQUEST['min'];
	}
	$max = isset($_REQUEST['max']) ? $_REQUEST['max'] : -1;
	if (isset($_REQUEST['ascending'])) {
		$ascending = $_REQUEST['ascending'];
	}
	$messageCount = $stream->messageCount;
	
	if ($withMessageTotals) {
		Q_Response::setSlot('messageTotals', $stream->get('messageTotals'));
	}
	$streamType = $stream->type;
	Q_Response::setSlot('extras', compact(
		'publisherId', 'streamName', 'streamType', 'messageCount'
	));

	$messages = $stream->getMessages(@compact('type', 'min', 'max', 'limit', 'ascending'));
	return Db::exportArray($messages);
}