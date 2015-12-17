
if(typeof n4s === "undefined") n4s = {};

/**
 * An instance for storing and retrieving data
 * External to ajax encase I wanna use it throughout the app
 */
n4s.cache = (function() {

	/**
	 * @var object The cache
	 */
	var _cache = {};

	/**
	 * Get a cached item
	 * @param string key The key to set in the cache
	 * @return mixed
	 */
	var _get = function(key) {
 		return _cache[key];
 	};

	/**
	 * Set a cache item
	 * @param string key The key to set in the cache
	 * @param mixed value The cached item
	 */
	var _set = function(url, data) {
		_cache[url] = data;
	};

	/**
	 * Clean (empty) the cache
	 * @return void
	 */
	var _flush = function() {
 	  _cache = {};
	};

	return {
		get: _get,
		set: _set,
		flush: _flush
	};
})();
