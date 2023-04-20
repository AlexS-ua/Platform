<h1>
	Thanks for signing up with <?php echo $communityName ?>,
	<?php echo $user->displayName(array('short' => true)) ?> 
</h1>

<h2>
	This is an example activation email, generated by views/Users/email/activation.php
</h2>

<p>
	You should make own view for activation emails, and then set the
	"Users"/"transactional"/"activation"/"subject" and
	"Users"/"transactional"/"activation"/"body" config fields.
</p>

<p>
	We should remember to put a link so you can set a password and activate your account,
	<?php echo Q_Html::a($link, 'like this') ?> 
</p>

<p style="margin-top: 100px;">
	And somewhere on the bottom, you'll probably want to place a link to:
	<?php echo Q_Html::a($unsubscribe, 'unsubscribe') ?> 
</p>

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "EmailMessage",
  "action": {
    "@type": "ViewAction",
    "url": "<?php echo $link ?>",
    "name": "Activate my account"
  },
  "description": "Activate my account"
}
</script>