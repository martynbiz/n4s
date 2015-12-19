/**
 * @name n4s
 * @module n4s
 * @desc Independent cache storage for ajax and JS apps
 * @author Martyn Bissett
 * @version 0.0.0
 */

/**
 * An instance for storing and retrieving data
 * External to ajax encase I wanna use it throughout the app
 */
n4s = (function() {

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

/**
 * @name n4s library
 * @module n4s.http
 * @desc Independent http caller (ajax)
 * @author Martyn Bissett
 * @version 0.0.0
 */

if(typeof n4s === "undefined") n4s = {};

/**
 * Ajax caller with built in caching (something jquery doesn't offer)
 * Dependencies: cache, utils
 */
n4s.http = function() {

	/**
	 * The last response
	 * @var object
	 */
	var _lastResponse = {};

	/**
	 * prepare the data depending on what dataType is (e.g. JSON)
	 * @param mixed data The data to convert to another type (e.g json)
	 * @param string dataType e.g. "json"
	 * @return mixed Prepared data
	 */
	var _prepareData = function (data, dataType) {
		switch(dataType.toUpperCase()) {
			case "JSON":
				data = JSON.parse(data);
				break;
		}
		return data;
	};

	/**
	 * Will return the last response object
	 * @return object
	 */
	var _getLastResponse = function() {
		return _lastResponse;
	};

	/**
	 * Will return the last response object
	 * @return object
	 */
	var _setLastResponse = function(xmlhttp, data) {
		_lastResponse = {
			status: xmlhttp.status,
			data: data,
		};
	};

	/**
	 * Fetch data from the server
	 */
	var _send = function(options) {

 		// default options
 		options = n4s.utils.extend({
 			success: function() {
				console.log("n4s.http: Success handler not defined");
			},
			error: function() {
				console.log("n4s.http: Error handler not defined");
			},
 			get_cached: false,
 			method: "GET",
 			data_type: "text",
 			data: null
 		}, options);

 		// check cache
 		if(options.get_cached && n4s.cache.get(options.url)) {
 			options.success(_prepareData(n4s.cache.get(options.url), options.data_type), options.data_type);
 			return true;
 		}

 		// make ajax call
 		var xmlhttp;
 		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

 		xmlhttp.onreadystatechange = function() {
 			if (xmlhttp.readyState==4) {

				var data = _prepareData(xmlhttp.responseText, options.data_type);

				// update the last response before the success handler
				_setLastResponse(xmlhttp, data);

				if (xmlhttp.status==200) {

					// store the cache for later, in the event that
					// TODO use the cache flag, only store if passed
					n4s.cache.set(options.url, xmlhttp.responseText, options.data_type);

					// call the success method
	 				options.success(data);

				} else { // error handler

					// when an error occurs, we will call the developer defined error
					// handler
					options.error(data);
				}
 			}
		}

		// Set header so the called script knows that it's an XMLHttpRequest
		xmlhttp.open(options.method.toUpperCase(), options.url, true);

		// this is required so that the server-side scripts know if is an ajax request
		xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");

 		if(options.method.toUpperCase() === 'POST') {
 			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 			var data = function(data) {
 				var pairs = [];
 				for(var name in data) {
 					pairs.push(name+"="+data[name]);
 				}
 				return pairs.join("&");
 			}(options.data);
 			xmlhttp.send(data);
 		} else {
 			xmlhttp.send();
 		}

 	};

	// return public properties and
	return {
		options: {},
		send: _send,
		getLastResponse: _getLastResponse
	}

}();

/**
 * @name utils
 * @module n4s
 * @desc Independent cache storage for ajax and JS apps
 * @author Martyn Bissett
 * @version 0.0.0
 */

if(typeof n4s === "undefined") n4s = {};

/**
 * Collection of helper utils
 */
n4s.utils = (function() {

	/**
	 * Extend an object e.g. utils.extend(default, options)
	 */
	var _extend = function() {

		var new_options = {};
		for(var i=0; i<arguments.length; i++) {
			for(var name in arguments[i]) { new_options[name] = arguments[i][name] }
		}
		return new_options;
 	}

	return {
		extend: _extend,
	};
})();
