<?php

function Streams_register_response_data()
{
	$fields = Users::responseData();
	if (!empty($fields['user'])) {
		$fields['user']['displayName'] = Streams::displayName($fields['user']['id']);
	}
	return $fields;
}