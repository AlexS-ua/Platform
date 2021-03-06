/**
 * Autogenerated base class for the Places model.
 * 
 * Don't change this file, since it can be overwritten.
 * Instead, change the Places.js file.
 *
 * @module Places
 */
var Q = require('Q');
var Db = Q.require('Db');

/**
 * Base class for the Places model
 * @namespace Base
 * @class Places
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
	"Places_Autocomplete",
	"Places_Location",
	"Places_Postcode"
];

/**
 * This method calls Db.connect() using information stored in the configuration.
 * If this has already been called, then the same db object is returned.
 * @method db
 * @return {Db} The database connection
 */
Base.db = function () {
	return Db.connect('Places');
};

/**
 * The connection name for the class
 * @method connectionName
 * @return {string} The name of the connection
 */
Base.connectionName = function() {
	return 'Places';
};

/**
 * Link to Places.Autocomplete model
 * @property Autocomplete
 * @type Places.Autocomplete
 */
Base.Autocomplete = Q.require('Places/Autocomplete');

/**
 * Link to Places.Location model
 * @property Location
 * @type Places.Location
 */
Base.Location = Q.require('Places/Location');

/**
 * Link to Places.Postcode model
 * @property Postcode
 * @type Places.Postcode
 */
Base.Postcode = Q.require('Places/Postcode');
