<?php

function Users_resend_response_data()
{
	$activationLink = null;
	if ($user = Q::ifset(Users::$cache, 'user', null)) {
		if ($user->signedUpWith === 'mobile') {
			$fields = array('m' => $user->mobileNumberPending);
		} else if ($user->signedUpWith === 'email') {
			$fields = array('e' => $user->emailAddressPending);
		}
		$user = $user->exportArray();
		$activationLink = Q_Uri::url("Users/activate?")
			. '?' . http_build_query($fields);
	}
	return compact('user', 'activationLink');
}