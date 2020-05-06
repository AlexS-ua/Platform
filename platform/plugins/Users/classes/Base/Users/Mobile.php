<?php

/**
 * Autogenerated base class representing mobile rows
 * in the Users database.
 *
 * Don't change this file, since it can be overwritten.
 * Instead, change the Users_Mobile.php file.
 *
 * @module Users
 */
/**
 * Base class representing 'Mobile' rows in the 'Users' database
 * @class Base_Users_Mobile
 * @extends Db_Row
 *
 * @param {array} [$fields=array()] The fields values to initialize table row as 
 * an associative array of $column => $value pairs
 * @param {string} [$fields.number] defaults to ""
 * @param {string|Db_Expression} [$fields.insertedTime] defaults to new Db_Expression("CURRENT_TIMESTAMP")
 * @param {string|Db_Expression} [$fields.updatedTime] defaults to null
 * @param {string} [$fields.userId] defaults to ""
 * @param {string} [$fields.extension] defaults to ""
 * @param {string} [$fields.carrier] defaults to "unverified"
 * @param {string} [$fields.state] defaults to "unverified"
 * @param {string} [$fields.capabilities] defaults to "unverified"
 * @param {string} [$fields.activationCode] defaults to ""
 * @param {string|Db_Expression} [$fields.activationCodeExpires] defaults to null
 * @param {string} [$fields.authCode] defaults to ""
 */
abstract class Base_Users_Mobile extends Db_Row
{
	/**
	 * @property $number
	 * @type string
	 * @default ""
	 * 
	 */
	/**
	 * @property $insertedTime
	 * @type string|Db_Expression
	 * @default new Db_Expression("CURRENT_TIMESTAMP")
	 * 
	 */
	/**
	 * @property $updatedTime
	 * @type string|Db_Expression
	 * @default null
	 * 
	 */
	/**
	 * @property $userId
	 * @type string
	 * @default ""
	 * 
	 */
	/**
	 * @property $extension
	 * @type string
	 * @default ""
	 * 
	 */
	/**
	 * @property $carrier
	 * @type string
	 * @default "unverified"
	 * 
	 */
	/**
	 * @property $state
	 * @type string
	 * @default "unverified"
	 * 
	 */
	/**
	 * @property $capabilities
	 * @type string
	 * @default "unverified"
	 * 
	 */
	/**
	 * @property $activationCode
	 * @type string
	 * @default ""
	 * 
	 */
	/**
	 * @property $activationCodeExpires
	 * @type string|Db_Expression
	 * @default null
	 * 
	 */
	/**
	 * @property $authCode
	 * @type string
	 * @default ""
	 * Used in all links sent by sms, to authenticate the source
	 */
	/**
	 * The setUp() method is called the first time
	 * an object of this class is constructed.
	 * @method setUp
	 */
	function setUp()
	{
		$this->setDb(self::db());
		$this->setTable(self::table());
		$this->setPrimaryKey(
			array (
			  0 => 'number',
			)
		);
	}

	/**
	 * Connects to database
	 * @method db
	 * @static
	 * @return {Db_Interface} The database object
	 */
	static function db()
	{
		return Db::connect('Users');
	}

	/**
	 * Retrieve the table name to use in SQL statement
	 * @method table
	 * @static
	 * @param {boolean} [$with_db_name=true] Indicates wheather table name should contain the database name
	 * @param {string} [$alias=null] You can optionally provide an alias for the table to be used in queries
 	 * @return {string|Db_Expression} The table name as string optionally without database name if no table sharding
	 * was started or Db_Expression class with prefix and database name templates is table was sharded
	 */
	static function table($with_db_name = true, $alias = null)
	{
		if (Q_Config::get('Db', 'connections', 'Users', 'indexes', 'Mobile', false)) {
			return new Db_Expression(($with_db_name ? '{$dbname}.' : '').'{$prefix}'.'mobile');
		} else {
			$conn = Db::getConnection('Users');
  			$prefix = empty($conn['prefix']) ? '' : $conn['prefix'];
  			$table_name = $prefix . 'mobile';
  			if (!$with_db_name)
  				return $table_name;
  			$db = Db::connect('Users');
			$alias = isset($alias) ? ' '.$alias : '';
  			return $db->dbName().'.'.$table_name.$alias;
		}
	}
	/**
	 * The connection name for the class
	 * @method connectionName
	 * @static
	 * @return {string} The name of the connection
	 */
	static function connectionName()
	{
		return 'Users';
	}

	/**
	 * Create SELECT query to the class table
	 * @method select
	 * @static
	 * @param {string|array} [$fields=null] The fields as strings, or array of alias=>field.
	 *   The default is to return all fields of the table.
	 * @param {string} [$alias=null] Table alias.
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function select($fields=null, $alias = null)
	{
		if (!isset($fields)) {
			$fieldNames = array();
			$a = isset($alias) ? $alias.'.' : '';
			foreach (self::fieldNames() as $fn) {
				$fieldNames[] = $a .  $fn;
			}
			$fields = implode(',', $fieldNames);
		}
		$alias = isset($alias) ? ' '.$alias : '';
		$q = self::db()->select($fields, self::table(true, $alias));
		$q->className = 'Users_Mobile';
		return $q;
	}

	/**
	 * Create UPDATE query to the class table
	 * @method update
	 * @static
	 * @param {string} [$alias=null] Table alias
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function update($alias = null)
	{
		$alias = isset($alias) ? ' '.$alias : '';
		$q = self::db()->update(self::table(true, $alias));
		$q->className = 'Users_Mobile';
		return $q;
	}

	/**
	 * Create DELETE query to the class table
	 * @method delete
	 * @static
	 * @param {string} [$table_using=null] If set, adds a USING clause with this table
	 * @param {string} [$alias=null] Table alias
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function delete($table_using = null, $alias = null)
	{
		$alias = isset($alias) ? ' '.$alias : '';
		$q = self::db()->delete(self::table(true, $alias), $table_using);
		$q->className = 'Users_Mobile';
		return $q;
	}

	/**
	 * Create INSERT query to the class table
	 * @method insert
	 * @static
	 * @param {array} [$fields=array()] The fields as an associative array of column => value pairs
	 * @param {string} [$alias=null] Table alias
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function insert($fields = array(), $alias = null)
	{
		$alias = isset($alias) ? ' '.$alias : '';
		$q = self::db()->insert(self::table(true, $alias), $fields);
		$q->className = 'Users_Mobile';
		return $q;
	}
	
	/**
	 * Inserts multiple rows into a single table, preparing the statement only once,
	 * and executes all the queries.
	 * @method insertManyAndExecute
	 * @static
	 * @param {array} [$rows=array()] The array of rows to insert. 
	 * (The field names for the prepared statement are taken from the first row.)
	 * You cannot use Db_Expression objects here, because the function binds all parameters with PDO.
	 * @param {array} [$options=array()]
	 *   An associative array of options, including:
	 *
	 * * "chunkSize" {integer} The number of rows to insert at a time. defaults to 20.<br>
	 * * "onDuplicateKeyUpdate" {array} You can put an array of fieldname => value pairs here,
	 * 		which will add an ON DUPLICATE KEY UPDATE clause to the query.
	 *
	 */
	static function insertManyAndExecute($rows = array(), $options = array())
	{
		self::db()->insertManyAndExecute(
			self::table(), $rows,
			array_merge($options, array('className' => 'Users_Mobile'))
		);
	}
	
	/**
	 * Create raw query with begin clause
	 * You'll have to specify shards yourself when calling execute().
	 * @method begin
	 * @static
	 * @param {string} [$lockType=null] First parameter to pass to query->begin() function
	 * @param {string} [$transactionKey=null] Pass a transactionKey here to "resolve" a previously
	 *  executed that began a transaction with ->begin(). This is to guard against forgetting
	 *  to "resolve" a begin() query with a corresponding commit() or rollback() query
	 *  from code that knows about this transactionKey. Passing a transactionKey that doesn't
	 *  match the latest one on the transaction "stack" also generates an error.
	 *  Passing "*" here matches any transaction key that may have been on the top of the stack.
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function begin($lockType = null, $transactionKey = null)
	{
		$q = self::db()->rawQuery('')->begin($lockType, $transactionKey);
		$q->className = 'Users_Mobile';
		return $q;
	}
	
	/**
	 * Create raw query with commit clause
	 * You'll have to specify shards yourself when calling execute().
	 * @method commit
	 * @static
	 * @param {string} [$transactionKey=null] Pass a transactionKey here to "resolve" a previously
	 *  executed that began a transaction with ->begin(). This is to guard against forgetting
	 *  to "resolve" a begin() query with a corresponding commit() or rollback() query
	 *  from code that knows about this transactionKey. Passing a transactionKey that doesn't
	 *  match the latest one on the transaction "stack" also generates an error.
	 *  Passing "*" here matches any transaction key that may have been on the top of the stack.
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function commit($transactionKey = null)
	{
		$q = self::db()->rawQuery('')->commit($transactionKey);
		$q->className = 'Users_Mobile';
		return $q;
	}
	
	/**
	 * Create raw query with rollback clause
	 * @method rollback
	 * @static
	 * @param {array} $criteria Can be used to target the rollback to some shards.
	 *  Otherwise you'll have to specify shards yourself when calling execute().
	 * @return {Db_Query_Mysql} The generated query
	 */
	static function rollback()
	{
		$q = self::db()->rawQuery('')->rollback();
		$q->className = 'Users_Mobile';
		return $q;
	}
	
	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_number
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_number($value)
	{
		if (!isset($value)) {
			$value='';
		}
		if ($value instanceof Db_Expression) {
			return array('number', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".number");
		if (strlen($value) > 255)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".number");
		return array('number', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the number field
	 * @return {integer}
	 */
	function maxSize_number()
	{

		return 255;			
	}

	/**
	 * Returns schema information for number column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_number()
	{

return array (
  0 => 
  array (
    0 => 'varbinary',
    1 => '255',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => 'PRI',
  3 => NULL,
);			
	}

	/**
	 * Method is called before setting the field and normalize the DateTime string
	 * @method beforeSet_insertedTime
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not represent valid DateTime
	 */
	function beforeSet_insertedTime($value)
	{
		if ($value instanceof Db_Expression) {
			return array('insertedTime', $value);
		}
		if ($value instanceof DateTime) {
			$value = $value->getTimestamp();
		}
		if (is_numeric($value)) {
			$newDateTime = new DateTime();
			$datetime = $newDateTime->setTimestamp($value);
		} else {
			$datetime = new DateTime($value);
		}
		$value = $datetime->format("Y-m-d H:i:s");
		return array('insertedTime', $value);			
	}

	/**
	 * Returns schema information for insertedTime column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_insertedTime()
	{

return array (
  0 => 
  array (
    0 => 'timestamp',
    1 => '255',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => '',
  3 => 'CURRENT_TIMESTAMP',
);			
	}

	/**
	 * Method is called before setting the field and normalize the DateTime string
	 * @method beforeSet_updatedTime
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not represent valid DateTime
	 */
	function beforeSet_updatedTime($value)
	{
		if (!isset($value)) {
			return array('updatedTime', $value);
		}
		if ($value instanceof Db_Expression) {
			return array('updatedTime', $value);
		}
		if ($value instanceof DateTime) {
			$value = $value->getTimestamp();
		}
		if (is_numeric($value)) {
			$newDateTime = new DateTime();
			$datetime = $newDateTime->setTimestamp($value);
		} else {
			$datetime = new DateTime($value);
		}
		$value = $datetime->format("Y-m-d H:i:s");
		return array('updatedTime', $value);			
	}

	/**
	 * Returns schema information for updatedTime column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_updatedTime()
	{

return array (
  0 => 
  array (
    0 => 'timestamp',
    1 => '255',
    2 => '',
    3 => false,
  ),
  1 => true,
  2 => 'MUL',
  3 => NULL,
);			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_userId
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_userId($value)
	{
		if (!isset($value)) {
			$value='';
		}
		if ($value instanceof Db_Expression) {
			return array('userId', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".userId");
		if (strlen($value) > 31)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".userId");
		return array('userId', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the userId field
	 * @return {integer}
	 */
	function maxSize_userId()
	{

		return 31;			
	}

	/**
	 * Returns schema information for userId column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_userId()
	{

return array (
  0 => 
  array (
    0 => 'varbinary',
    1 => '31',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => 'MUL',
  3 => '',
);			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_extension
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_extension($value)
	{
		if (!isset($value)) {
			$value='';
		}
		if ($value instanceof Db_Expression) {
			return array('extension', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".extension");
		if (strlen($value) > 7)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".extension");
		return array('extension', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the extension field
	 * @return {integer}
	 */
	function maxSize_extension()
	{

		return 7;			
	}

	/**
	 * Returns schema information for extension column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_extension()
	{

return array (
  0 => 
  array (
    0 => 'varchar',
    1 => '7',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => '',
  3 => '',
);			
	}

	/**
	 * Method is called before setting the field and verifies if value belongs to enum values list
	 * @method beforeSet_carrier
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not belong to enum values list
	 */
	function beforeSet_carrier($value)
	{
		if ($value instanceof Db_Expression) {
			return array('carrier', $value);
		}
		if (!in_array($value, array('unverified','att','cingular','sprint','tmobile','verizon')))
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".carrier");
		return array('carrier', $value);			
	}

	/**
	 * Returns schema information for carrier column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_carrier()
	{

return array (
  0 => 
  array (
    0 => 'enum',
    1 => '\'unverified\',\'att\',\'cingular\',\'sprint\',\'tmobile\',\'verizon\'',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => '',
  3 => 'unverified',
);			
	}

	/**
	 * Method is called before setting the field and verifies if value belongs to enum values list
	 * @method beforeSet_state
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not belong to enum values list
	 */
	function beforeSet_state($value)
	{
		if ($value instanceof Db_Expression) {
			return array('state', $value);
		}
		if (!in_array($value, array('unverified','active','suspended','unsubscribed')))
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".state");
		return array('state', $value);			
	}

	/**
	 * Returns schema information for state column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_state()
	{

return array (
  0 => 
  array (
    0 => 'enum',
    1 => '\'unverified\',\'active\',\'suspended\',\'unsubscribed\'',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => '',
  3 => 'unverified',
);			
	}

	/**
	 * Method is called before setting the field and verifies if value belongs to enum values list
	 * @method beforeSet_capabilities
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not belong to enum values list
	 */
	function beforeSet_capabilities($value)
	{
		if ($value instanceof Db_Expression) {
			return array('capabilities', $value);
		}
		if (!in_array($value, array('unverified','sms','wap','internet','sms_and_wap','sms_and_internet')))
			throw new Exception("Out-of-range value '$value' being assigned to ".$this->getTable().".capabilities");
		return array('capabilities', $value);			
	}

	/**
	 * Returns schema information for capabilities column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_capabilities()
	{

return array (
  0 => 
  array (
    0 => 'enum',
    1 => '\'unverified\',\'sms\',\'wap\',\'internet\',\'sms_and_wap\',\'sms_and_internet\'',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => '',
  3 => 'unverified',
);			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_activationCode
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_activationCode($value)
	{
		if (!isset($value)) {
			$value='';
		}
		if ($value instanceof Db_Expression) {
			return array('activationCode', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".activationCode");
		if (strlen($value) > 255)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".activationCode");
		return array('activationCode', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the activationCode field
	 * @return {integer}
	 */
	function maxSize_activationCode()
	{

		return 255;			
	}

	/**
	 * Returns schema information for activationCode column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_activationCode()
	{

return array (
  0 => 
  array (
    0 => 'varbinary',
    1 => '255',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => '',
  3 => NULL,
);			
	}

	/**
	 * Method is called before setting the field and normalize the DateTime string
	 * @method beforeSet_activationCodeExpires
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value does not represent valid DateTime
	 */
	function beforeSet_activationCodeExpires($value)
	{
		if (!isset($value)) {
			return array('activationCodeExpires', $value);
		}
		if ($value instanceof Db_Expression) {
			return array('activationCodeExpires', $value);
		}
		if ($value instanceof DateTime) {
			$value = $value->getTimestamp();
		}
		if (is_numeric($value)) {
			$newDateTime = new DateTime();
			$datetime = $newDateTime->setTimestamp($value);
		} else {
			$datetime = new DateTime($value);
		}
		$value = $datetime->format("Y-m-d H:i:s");
		return array('activationCodeExpires', $value);			
	}

	/**
	 * Returns schema information for activationCodeExpires column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_activationCodeExpires()
	{

return array (
  0 => 
  array (
    0 => 'timestamp',
    1 => '255',
    2 => '',
    3 => false,
  ),
  1 => true,
  2 => '',
  3 => NULL,
);			
	}

	/**
	 * Method is called before setting the field and verifies if value is string of length within acceptable limit.
	 * Optionally accept numeric value which is converted to string
	 * @method beforeSet_authCode
	 * @param {string} $value
	 * @return {array} An array of field name and value
	 * @throws {Exception} An exception is thrown if $value is not string or is exceedingly long
	 */
	function beforeSet_authCode($value)
	{
		if (!isset($value)) {
			$value='';
		}
		if ($value instanceof Db_Expression) {
			return array('authCode', $value);
		}
		if (!is_string($value) and !is_numeric($value))
			throw new Exception('Must pass a string to '.$this->getTable().".authCode");
		if (strlen($value) > 255)
			throw new Exception('Exceedingly long value being assigned to '.$this->getTable().".authCode");
		return array('authCode', $value);			
	}

	/**
	 * Returns the maximum string length that can be assigned to the authCode field
	 * @return {integer}
	 */
	function maxSize_authCode()
	{

		return 255;			
	}

	/**
	 * Returns schema information for authCode column
	 * @return {array} [[typeName, displayRange, modifiers, unsigned], isNull, key, default]
	 */
	static function column_authCode()
	{

return array (
  0 => 
  array (
    0 => 'varbinary',
    1 => '255',
    2 => '',
    3 => false,
  ),
  1 => false,
  2 => '',
  3 => NULL,
);			
	}

	/**
	 * Check if mandatory fields are set and updates 'magic fields' with appropriate values
	 * @method beforeSave
	 * @param {array} $value The array of fields
	 * @return {array}
	 * @throws {Exception} If mandatory field is not set
	 */
	function beforeSave($value)
	{
		if (!$this->retrieved) {
			$table = $this->getTable();
			foreach (array('number') as $name) {
				if (!isset($value[$name])) {
					throw new Exception("the field $table.$name needs a value, because it is NOT NULL, not auto_increment, and lacks a default value.");
				}
			}
		}						
		// convention: we'll have updatedTime = insertedTime if just created.
		$this->updatedTime = $value['updatedTime'] = new Db_Expression('CURRENT_TIMESTAMP');
		return $value;			
	}

	/**
	 * Retrieves field names for class table
	 * @method fieldNames
	 * @static
	 * @param {string} [$table_alias=null] If set, the alieas is added to each field
	 * @param {string} [$field_alias_prefix=null] If set, the method returns associative array of ('prefixed field' => 'field') pairs
	 * @return {array} An array of field names
	 */
	static function fieldNames($table_alias = null, $field_alias_prefix = null)
	{
		$field_names = array('number', 'insertedTime', 'updatedTime', 'userId', 'extension', 'carrier', 'state', 'capabilities', 'activationCode', 'activationCodeExpires', 'authCode');
		$result = $field_names;
		if (!empty($table_alias)) {
			$temp = array();
			foreach ($result as $field_name)
				$temp[] = $table_alias . '.' . $field_name;
			$result = $temp;
		} 
		if (!empty($field_alias_prefix)) {
			$temp = array();
			reset($field_names);
			foreach ($result as $field_name) {
				$temp[$field_alias_prefix . current($field_names)] = $field_name;
				next($field_names);
			}
			$result = $temp;
		}
		return $result;			
	}
};