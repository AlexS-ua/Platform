/**
 * Autogenerated base class for the Streams model.
 * 
 * Don't change this file, since it can be overwritten.
 * Instead, change the Streams.js file.
 *
 * @module Streams
 */
var Q = require('Q');
var Db = Q.require('Db');

/**
 * Base class for the Streams model
 * @namespace Base
 * @class Streams
 * @static
 */
function Base () {
	return this;
}
 
module.exports = Base;

/**
 * The list of model classes
 * @property tableClasses
 * @type array
 */
Base.tableClasses = [
	"Streams_Access",
	"Streams_Avatar",
	"Streams_Category",
	"Streams_Invite",
	"Streams_Invited",
	"Streams_Message",
	"Streams_MessageTotal",
	"Streams_Metrics",
	"Streams_Notification",
	"Streams_Participant",
	"Streams_RelatedFrom",
	"Streams_RelatedFromTotal",
	"Streams_RelatedTo",
	"Streams_RelatedToTotal",
	"Streams_Request",
	"Streams_State",
	"Streams_Stream",
	"Streams_Subscription",
	"Streams_SubscriptionRule",
	"Streams_Task"
];

/**
 * This method calls Db.connect() using information stored in the configuration.
 * If this has already been called, then the same db object is returned.
 * @method db
 * @return {Db} The database connection
 */
Base.db = function () {
	return Db.connect('Streams');
};

/**
 * The connection name for the class
 * @method connectionName
 * @return {string} The name of the connection
 */
Base.connectionName = function() {
	return 'Streams';
};

/**
 * Link to Streams.Access model
 * @property Access
 * @type Streams.Access
 */
Base.Access = Q.require('Streams/Access');

/**
 * Link to Streams.Avatar model
 * @property Avatar
 * @type Streams.Avatar
 */
Base.Avatar = Q.require('Streams/Avatar');

/**
 * Link to Streams.Category model
 * @property Category
 * @type Streams.Category
 */
Base.Category = Q.require('Streams/Category');

/**
 * Link to Streams.Invite model
 * @property Invite
 * @type Streams.Invite
 */
Base.Invite = Q.require('Streams/Invite');

/**
 * Link to Streams.Invited model
 * @property Invited
 * @type Streams.Invited
 */
Base.Invited = Q.require('Streams/Invited');

/**
 * Link to Streams.Message model
 * @property Message
 * @type Streams.Message
 */
Base.Message = Q.require('Streams/Message');

/**
 * Link to Streams.MessageTotal model
 * @property MessageTotal
 * @type Streams.MessageTotal
 */
Base.MessageTotal = Q.require('Streams/MessageTotal');

/**
 * Link to Streams.Metrics model
 * @property Metrics
 * @type Streams.Metrics
 */
Base.Metrics = Q.require('Streams/Metrics');

/**
 * Link to Streams.Notification model
 * @property Notification
 * @type Streams.Notification
 */
Base.Notification = Q.require('Streams/Notification');

/**
 * Link to Streams.Participant model
 * @property Participant
 * @type Streams.Participant
 */
Base.Participant = Q.require('Streams/Participant');

/**
 * Link to Streams.RelatedFrom model
 * @property RelatedFrom
 * @type Streams.RelatedFrom
 */
Base.RelatedFrom = Q.require('Streams/RelatedFrom');

/**
 * Link to Streams.RelatedFromTotal model
 * @property RelatedFromTotal
 * @type Streams.RelatedFromTotal
 */
Base.RelatedFromTotal = Q.require('Streams/RelatedFromTotal');

/**
 * Link to Streams.RelatedTo model
 * @property RelatedTo
 * @type Streams.RelatedTo
 */
Base.RelatedTo = Q.require('Streams/RelatedTo');

/**
 * Link to Streams.RelatedToTotal model
 * @property RelatedToTotal
 * @type Streams.RelatedToTotal
 */
Base.RelatedToTotal = Q.require('Streams/RelatedToTotal');

/**
 * Link to Streams.Request model
 * @property Request
 * @type Streams.Request
 */
Base.Request = Q.require('Streams/Request');

/**
 * Link to Streams.State model
 * @property State
 * @type Streams.State
 */
Base.State = Q.require('Streams/State');

/**
 * Link to Streams.Stream model
 * @property Stream
 * @type Streams.Stream
 */
Base.Stream = Q.require('Streams/Stream');

/**
 * Link to Streams.Subscription model
 * @property Subscription
 * @type Streams.Subscription
 */
Base.Subscription = Q.require('Streams/Subscription');

/**
 * Link to Streams.SubscriptionRule model
 * @property SubscriptionRule
 * @type Streams.SubscriptionRule
 */
Base.SubscriptionRule = Q.require('Streams/SubscriptionRule');

/**
 * Link to Streams.Task model
 * @property Task
 * @type Streams.Task
 */
Base.Task = Q.require('Streams/Task');
