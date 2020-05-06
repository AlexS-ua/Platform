/**
 * Autogenerated base class representing session rows
 * in the Users database.
 *
 * Don't change this file, since it can be overwritten.
 * Instead, change the Users/Session.js file.
 *
 * @module Users
 */

var Q = require('Q');
var Db = Q.require('Db');
var Users = Q.require('Users');
var Row = Q.require('Db/Row');

/**
 * Base class representing 'Session' rows in the 'Users' database
 * @namespace Base.Users
 * @class Session
 * @extends Db.Row
 * @constructor
 * @param {Object} [fields={}] The fields values to initialize table row as 
 * an associative array of {column: value} pairs
 * @param {String|Buffer} [fields.id] defaults to ""
 * @param {String} [fields.content] defaults to ""
 * @param {String} [fields.php] defaults to ""
 * @param {String|Buffer} [fields.userId] defaults to null
 * @param {String|Buffer} [fields.deviceId] defaults to ""
 * @param {Integer} [fields.timeout] defaults to 0
 * @param {Integer} [fields.duration] defaults to 0
 * @param {String} [fields.platform] defaults to null
 * @param {String} [fields.appId] defaults to null
 * @param {String} [fields.version] defaults to null
 * @param {String} [fields.formFactor] defaults to null
 * @param {String|Db.Expression} [fields.insertedTime] defaults to new Db.Expression("CURRENT_TIMESTAMP")
 * @param {String|Db.Expression} [fields.updatedTime] defaults to null
 */
function Base (fields) {
	Base.constructors.apply(this, arguments);
}

Q.mixin(Base, Row);

/**
 * @property id
 * @type String|Buffer
 * @default ""
 * the session id
 */
/**
 * @property content
 * @type String
 * @default ""
 * json format
 */
/**
 * @property php
 * @type String
 * @default ""
 * php serialized session data
 */
/**
 * @property userId
 * @type String|Buffer
 * @default null
 * 
 */
/**
 * @property deviceId
 * @type String|Buffer
 * @default ""
 * If a push notification device is attached
 */
/**
 * @property timeout
 * @type Integer
 * @default 0
 * how long until the pincode needs to be entered
 */
/**
 * @property duration
 * @type Integer
 * @default 0
 * the number of seconds until the session is considered expired
 */
/**
 * @property platform
 * @type String
 * @default null
 * A platform like ios or android
 */
/**
 * @property appId
 * @type String
 * @default null
 * An external app id registered with the platform
 */
/**
 * @property version
 * @type String
 * @default null
 * The version of the platform
 */
/**
 * @property formFactor
 * @type String
 * @default null
 * 
 */
/**
 * @property insertedTime
 * @type String|Db.Expression
 * @default new Db.Expression("CURRENT_TIMESTAMP")
 * 
 */
/**
 * @property updatedTime
 * @type String|Db.Expression
 * @default null
 * PHP timestamp of last time this row was saved
 */

/**
 * This method calls Db.connect() using information stored in the configuration.
 * If this has already been called, then the same db object is returned.
 * @method db
 * @return {Db} The database connection
 */
Base.db = function () {
	return Users.db();
};

/**
 * Retrieve the table name to use in SQL statements
 * @method table
 * @param {boolean} [withoutDbName=false] Indicates wheather table name should contain the database name
 * @return {String|Db.Expression} The table name as string optionally without database name if no table sharding was started
 * or Db.Expression object with prefix and database name templates is table was sharded
 */
Base.table = function (withoutDbName) {
	if (Q.Config.get(['Db', 'connections', 'Users', 'indexes', 'Session'], false)) {
		return new Db.Expression((withoutDbName ? '' : '{$dbname}.')+'{$prefix}session');
	} else {
		var conn = Db.getConnection('Users');
		var prefix = conn.prefix || '';
		var tableName = prefix + 'session';
		var dbname = Base.table.dbname;
		if (!dbname) {
			var dsn = Db.parseDsnString(conn['dsn']);
			dbname = Base.table.dbname = dsn.dbname;
		}
		return withoutDbName ? tableName : dbname + '.' + tableName;
	}
};

/**
 * The connection name for the class
 * @method connectionName
 * @return {String} The name of the connection
 */
Base.connectionName = function() {
	return 'Users';
};

/**
 * Create SELECT query to the class table
 * @method SELECT
 * @param {String|Object} [fields=null] The fields as strings, or object of {alias:field} pairs.
 *   The default is to return all fields of the table.
 * @param {String|Object} [alias=null] The tables as strings, or object of {alias:table} pairs.
 * @return {Db.Query.Mysql} The generated query
 */
Base.SELECT = function(fields, alias) {
	if (!fields) {
		fields = Base.fieldNames().map(function (fn) {
			return fn;
		}).join(',');
	}
	var q = Base.db().SELECT(fields, Base.table()+(alias ? ' '+alias : ''));
	q.className = 'Users_Session';
	return q;
};

/**
 * Create UPDATE query to the class table. Use Db.Query.Mysql.set() method to define SET clause
 * @method UPDATE
 * @param {String} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.UPDATE = function(alias) {
	var q = Base.db().UPDATE(Base.table()+(alias ? ' '+alias : ''));
	q.className = 'Users_Session';
	return q;
};

/**
 * Create DELETE query to the class table
 * @method DELETE
 * @param {Object}[table_using=null] If set, adds a USING clause with this table
 * @param {String} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.DELETE = function(table_using, alias) {
	var q = Base.db().DELETE(Base.table()+(alias ? ' '+alias : ''), table_using);
	q.className = 'Users_Session';
	return q;
};

/**
 * Create INSERT query to the class table
 * @method INSERT
 * @param {Object} [fields={}] The fields as an associative array of {column: value} pairs
 * @param {String} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.INSERT = function(fields, alias) {
	var q = Base.db().INSERT(Base.table()+(alias ? ' '+alias : ''), fields || {});
	q.className = 'Users_Session';
	return q;
};

/**
 * Create raw query with BEGIN clause.
 * You'll have to specify shards yourself when calling execute().
 * @method BEGIN
 * @param {string} [$lockType] First parameter to pass to query.begin() function
 * @return {Db.Query.Mysql} The generated query
 */
Base.BEGIN = function($lockType) {
	var q = Base.db().rawQuery('').begin($lockType);
	q.className = 'Users_Session';
	return q;
};

/**
 * Create raw query with COMMIT clause
 * You'll have to specify shards yourself when calling execute().
 * @method COMMIT
 * @return {Db.Query.Mysql} The generated query
 */
Base.COMMIT = function() {
	var q = Base.db().rawQuery('').commit();
	q.className = 'Users_Session';
	return q;
};

/**
 * Create raw query with ROLLBACK clause
 * @method ROLLBACK
 * @param {Object} criteria can be used to target the query to some shards.
 *   Otherwise you'll have to specify shards yourself when calling execute().
 * @return {Db.Query.Mysql} The generated query
 */
Base.ROLLBACK = function(criteria) {
	var q = Base.db().rawQuery('').rollback(crieria);
	q.className = 'Users_Session';
	return q;
};

/**
 * The name of the class
 * @property className
 * @type string
 */
Base.prototype.className = "Users_Session";

// Instance methods

/**
 * Create INSERT query to the class table
 * @method INSERT
 * @param {object} [fields={}] The fields as an associative array of {column: value} pairs
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.prototype.setUp = function() {
	// does nothing for now
};

/**
 * Create INSERT query to the class table
 * @method INSERT
 * @param {object} [fields={}] The fields as an associative array of {column: value} pairs
 * @param {string} [alias=null] Table alias
 * @return {Db.Query.Mysql} The generated query
 */
Base.prototype.db = function () {
	return Base.db();
};

/**
 * Retrieve the table name to use in SQL statements
 * @method table
 * @param {boolean} [withoutDbName=false] Indicates wheather table name should contain the database name
 * @return {String|Db.Expression} The table name as string optionally without database name if no table sharding was started
 * or Db.Expression object with prefix and database name templates is table was sharded
 */
Base.prototype.table = function () {
	return Base.table();
};

/**
 * Retrieves primary key fields names for class table
 * @method primaryKey
 * @return {string[]} An array of field names
 */
Base.prototype.primaryKey = function () {
	return [
		"id"
	];
};

/**
 * Retrieves field names for class table
 * @method fieldNames
 * @return {array} An array of field names
 */
Base.prototype.fieldNames = function () {
	return Base.fieldNames();
};

/**
 * Retrieves field names for class table
 * @method fieldNames
 * @static
 * @return {array} An array of field names
 */
Base.fieldNames = function () {
	return [
		"id",
		"content",
		"php",
		"userId",
		"deviceId",
		"timeout",
		"duration",
		"platform",
		"appId",
		"version",
		"formFactor",
		"insertedTime",
		"updatedTime"
	];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_id
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_id = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Buffer))
			throw new Error('Must pass a String or Buffer to '+this.table()+".id");
		if (typeof value === "string" && value.length > 255)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".id");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the id field
	 * @return {integer}
	 */
Base.prototype.maxSize_id = function () {

		return 255;
};

	/**
	 * Returns schema information for id column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_id = function () {

return [["varbinary","255","",false],false,"PRI",null];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_content
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_content = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a String to '+this.table()+".content");
		if (typeof value === "string" && value.length > 4095)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".content");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the content field
	 * @return {integer}
	 */
Base.prototype.maxSize_content = function () {

		return 4095;
};

	/**
	 * Returns schema information for content column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_content = function () {

return [["varchar","4095","",false],false,"",null];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_php
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_php = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a String to '+this.table()+".php");
		if (typeof value === "string" && value.length > 4095)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".php");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the php field
	 * @return {integer}
	 */
Base.prototype.maxSize_php = function () {

		return 4095;
};

	/**
	 * Returns schema information for php column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_php = function () {

return [["varchar","4095","",false],false,"",null];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_userId
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_userId = function (value) {
		if (value == undefined) return value;
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Buffer))
			throw new Error('Must pass a String or Buffer to '+this.table()+".userId");
		if (typeof value === "string" && value.length > 31)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".userId");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the userId field
	 * @return {integer}
	 */
Base.prototype.maxSize_userId = function () {

		return 31;
};

	/**
	 * Returns schema information for userId column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_userId = function () {

return [["varbinary","31","",false],true,"MUL",null];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_deviceId
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_deviceId = function (value) {
		if (value == null) {
			value='';
		}
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Buffer))
			throw new Error('Must pass a String or Buffer to '+this.table()+".deviceId");
		if (typeof value === "string" && value.length > 700)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".deviceId");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the deviceId field
	 * @return {integer}
	 */
Base.prototype.maxSize_deviceId = function () {

		return 700;
};

	/**
	 * Returns schema information for deviceId column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_deviceId = function () {

return [["varbinary","700","",false],false,"",null];
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_timeout
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_timeout = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".timeout");
		if (value < -2147483648 || value > 2147483647)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".timeout");
		return value;
};

/**
 * Returns the maximum integer that can be assigned to the timeout field
 * @return {integer}
 */
Base.prototype.maxSize_timeout = function () {

		return 2147483647;
};

	/**
	 * Returns schema information for timeout column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_timeout = function () {

return [["int","11","",false],false,"","0"];
};

/**
 * Method is called before setting the field and verifies if integer value falls within allowed limits
 * @method beforeSet_duration
 * @param {integer} value
 * @return {integer} The value
 * @throws {Error} An exception is thrown if 'value' is not integer or does not fit in allowed range
 */
Base.prototype.beforeSet_duration = function (value) {
		if (value instanceof Db.Expression) return value;
		value = Number(value);
		if (isNaN(value) || Math.floor(value) != value) 
			throw new Error('Non-integer value being assigned to '+this.table()+".duration");
		if (value < -2147483648 || value > 2147483647)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".duration");
		return value;
};

/**
 * Returns the maximum integer that can be assigned to the duration field
 * @return {integer}
 */
Base.prototype.maxSize_duration = function () {

		return 2147483647;
};

	/**
	 * Returns schema information for duration column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_duration = function () {

return [["int","11","",false],false,"","0"];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_platform
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_platform = function (value) {
		if (value == undefined) return value;
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a String to '+this.table()+".platform");
		if (typeof value === "string" && value.length > 31)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".platform");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the platform field
	 * @return {integer}
	 */
Base.prototype.maxSize_platform = function () {

		return 31;
};

	/**
	 * Returns schema information for platform column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_platform = function () {

return [["varchar","31","",false],true,"",null];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_appId
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_appId = function (value) {
		if (value == undefined) return value;
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a String to '+this.table()+".appId");
		if (typeof value === "string" && value.length > 200)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".appId");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the appId field
	 * @return {integer}
	 */
Base.prototype.maxSize_appId = function () {

		return 200;
};

	/**
	 * Returns schema information for appId column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_appId = function () {

return [["varchar","200","",false],true,"",null];
};

/**
 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
 * Optionally accept numeric value which is converted to string
 * @method beforeSet_version
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' is not string or is exceedingly long
 */
Base.prototype.beforeSet_version = function (value) {
		if (value == undefined) return value;
		if (value instanceof Db.Expression) return value;
		if (typeof value !== "string" && typeof value !== "number")
			throw new Error('Must pass a String to '+this.table()+".version");
		if (typeof value === "string" && value.length > 34)
			throw new Error('Exceedingly long value being assigned to '+this.table()+".version");
		return value;
};

	/**
	 * Returns the maximum string length that can be assigned to the version field
	 * @return {integer}
	 */
Base.prototype.maxSize_version = function () {

		return 34;
};

	/**
	 * Returns schema information for version column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_version = function () {

return [["varchar","34","",false],true,"",null];
};

/**
 * Method is called before setting the field and verifies if value belongs to enum values list
 * @method beforeSet_formFactor
 * @param {string} value
 * @return {string} The value
 * @throws {Error} An exception is thrown if 'value' does not belong to enum values list
 */
Base.prototype.beforeSet_formFactor = function (value) {
		if (value == undefined) return value;
		if (value instanceof Db.Expression) return value;
		if (['mobile','tablet','desktop'].indexOf(value) < 0)
			throw new Error("Out-of-range value "+JSON.stringify(value)+" being assigned to "+this.table()+".formFactor");
		return value;
};

	/**
	 * Returns schema information for formFactor column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_formFactor = function () {

return [["enum","'mobile','tablet','desktop'","",false],true,"",null];
};

/**
 * Method is called before setting the field
 * @method beforeSet_insertedTime
 * @param {String} value
 * @return {Date|Db.Expression} If 'value' is not Db.Expression the current date is returned
 */
Base.prototype.beforeSet_insertedTime = function (value) {
		if (value instanceof Db.Expression) return value;
		if (typeof value !== 'object' && !isNaN(value)) {
			value = parseInt(value);
			value = new Date(value < 10000000000 ? value * 1000 : value);
		}
		value = (value instanceof Date) ? Base.db().toDateTime(value) : value;
		return value;
};

	/**
	 * Returns schema information for insertedTime column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_insertedTime = function () {

return [["timestamp","'mobile','tablet','desktop'","",false],false,"","CURRENT_TIMESTAMP"];
};

/**
 * Method is called before setting the field
 * @method beforeSet_updatedTime
 * @param {String} value
 * @return {Date|Db.Expression} If 'value' is not Db.Expression the current date is returned
 */
Base.prototype.beforeSet_updatedTime = function (value) {
		if (value == undefined) return value;
		if (value instanceof Db.Expression) return value;
		if (typeof value !== 'object' && !isNaN(value)) {
			value = parseInt(value);
			value = new Date(value < 10000000000 ? value * 1000 : value);
		}
		value = (value instanceof Date) ? Base.db().toDateTime(value) : value;
		return value;
};

	/**
	 * Returns schema information for updatedTime column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
Base.column_updatedTime = function () {

return [["timestamp","'mobile','tablet','desktop'","",false],true,"MUL",null];
};

/**
 * Check if mandatory fields are set and updates 'magic fields' with appropriate values
 * @method beforeSave
 * @param {Object} value The object of fields
 * @param {Function} callback Call this callback if you return null
 * @return {Object|null} Return the fields, modified if necessary. If you return null, then you should call the callback(err, modifiedFields)
 * @throws {Error} If e.g. mandatory field is not set or a bad values are supplied
 */
Base.prototype.beforeSave = function (value) {
	var fields = ['id'], i;
	if (!this._retrieved) {
		var table = this.table();
		for (i=0; i<fields.length; i++) {
			if (this.fields[fields[i]] === undefined) {
				throw new Error("the field "+table+"."+fields[i]+" needs a value, because it is NOT NULL, not auto_increment, and lacks a default value.");
			}
		}
	}
	// convention: we'll have updatedTime = insertedTime if just created.
	this['updatedTime'] = value['updatedTime'] = new Db.Expression('CURRENT_TIMESTAMP');
	return value;
};

module.exports = Base;