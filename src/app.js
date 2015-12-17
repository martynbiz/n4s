// JavaScript Document

if(typeof n4s === "undefined") var n4s = {};

// dependancies: jQuery

n4s.app = (function() {

	// // private properties
	//
	// var _this;
	//
	// // this flag is set when page is loading, will disable other page loads at that time
	// var _pageLoadInProgress = false;
	// var _currentHref = "";
	// var _currentHash = "";


	// // private methods
	//
	// // pass in the html when it is available (from ajax load, or cache)
	// function _setHtml(newHtml, newTitle) {
	//
	// 	// set title
	// 	document.title = newTitle;
	//
	// 	// set body
	// 	// remove script tags (as we may have js firing twice
	// 	if(! _this.options.autoScripts) newHtml = newHtml.replace(/<script[^>]*>/gi, ' <!-- //removed script').replace(/<\/script>/gi, ' --> ');
	// 	document.body.innerHTML = newHtml;
	//
	// 	// set links (again -- new html)
	// 	_this.init();
	//
    // // ** hide loading
	//
	//
    // // update page loading flag
	// 	_pageLoadInProgress = false;
	//
	// 	// jump to hash position (if set)
	// 	if(_currentHash) location.hash = "#"+_currentHash;
	//
	// }
	//
	// // set the url using pushState, return the value
	// function _setUrl(url) {
	// 	window.history.pushState(null, null, url);
	// 	return window.location.href;
	// }
	//
	//
	// function _useCache(link, location) {
	//
	// 	// check three conditions:
	// 	// 1. something exists in cache (most importantly)
	// 	// 2. <a data-cache="..."
	// 	// 3. options.autoCache
	// 	if( link.getAttribute("data-cache") === "true" ) {
	// 	  return true;
	// 	} else if( _this.options.autoCache && link.getAttribute("data-cache") !== "false" ) {
	// 	  return true;
	// 	}
	//
	// 	return false;
	//
	// }
	//
	//
	//
	// function _loadHref(link) {
	//
	// 	// are we currently already loading a page?
	//
	// 	// this is to ensure that the corrent page (as expected from the user) is
	// 	// loaded and cached. If we allow parallel page loading it might cause the
	// 	// page to load one then another. Worse yet, it may screw up cache.
	// 	if(_pageLoadInProgress) {
	// 		return false;
	// 	}
	// 	_pageLoadInProgress = true;
	//
	//
	//
	// 	// prepare the link (remove hash)
	//
	// 	// we want to allow hash tag functionality. here we extract the hash tag and save it for
	// 	// when we have set the html etc.
	//
	// 	if(link.href.indexOf("#") < 0) {
	// 		_currentHref = link.href;
	// 		_currentHash = "";
	// 	} else {
	// 		_currentHref = link.href.split("#")[0];
	// 		_currentHash = link.href.split("#")[1];
	// 	}
	//
	//
	// 	// load page
	//
	// 	// we have a few things to check for. Ultimately data-cache="..." in the a tag will override any
	// 	// options. So, first we check if data-cache is "true" and the url is cached. Next (else if) we
	// 	// check that data-cache hasn't been set to "false" (e.g. dynamic page) but autoCache option is
	// 	// true and the page is cached. If none of these conditions are met then we ajax load fresh.
	//
	// 	var location = _setUrl(_currentHref);
	//
	// 	// ** create loading if it doesn't exist, and show it
	//
	//
	// 	// page doesn't exist in cache, load fresh
	// 	ajax.fetch({
	// 		url: location,
	// 		cache: _useCache(link, location),
	// 		success: function(response) {
	//
	// 	    // set html
	// 	    var newTitle = response.split(/(<title[^>]*>|<\/title>)/ig)[2];
	// 	    var newHtml = response.split(/(<body[^>]*>|<\/body>)/ig)[2];
	//
	// 	    _setHtml(newHtml, newTitle);
	//
	// 		}
	// 	});
	//
	// 	return false;
	//
	// }
	//
	//
	// 	// check whether, given the current circumstances, we should perform a
	// 	// cache load on a link -- really just so I can do some automated testing
	// 	// on this part
	// function _init(firstPageLoad) {
	//
	// 	if(firstPageLoad && _this.options.cacheFirstPage) {
	// 		// bit of a hack here, but we require the full html in cache -- so let's replicate that (well, body and title as that's all we need)
	// 		var html = '<html><head><title>'+document.title+'</title></head><body>'+document.body.innerHTML+'</body></html>';
	// 		ajax.cache.insert(window.location.href, html);
	// 	}
	//
	// 	var links = document.getElementsByTagName("A");
	// 	for(var i=0; i<links.length; i++) {
	// 		if(links[i].addEventListener) {
	// 			links[i].addEventListener('click', function(e) {
	// 				_loadHref(this);
	// 				e.preventDefault();
	// 			}, false);
	// 		} else if(links[i].attachEvent) {
	// 			links[i].attachEvent('onclick', function(e) {
	// 				_loadHref(this);
	// 				e.preventDefault();
	// 			});
	// 		} else {
	// 			return false; // event binding not supported
	// 		}
	// 	}
	//
	// 	return _this;
	//
	// }

	// /**
	//  * This will initiate elements by query
	//  * @param function handler This is the handler for new and initial html
	//  * @param void
	//  */
	// var _init = function(handler) {
	//
	//
 // 	};

	/**
	 * This will initiate elements by query
 	 * @param function handler This is the handler for new and initial html
	 * @param string query jQuery selector
	 * @param void
	 */
	var _init = function(handler, query) {

		// // if query is missing, set to all links
		// if (!query) {
		// 	query = "body";
		// }
		//
		// // attach "a" to query e.g. "body a"
		// query = query + " a";

		// // if handler is not a function, set default handler (load full body)
		// if (!handler) {
		// 	handler = function(target) {
		//
		// 		// "this" will be bound, and
		// 		_getHtml(target.href, handler, query); //target.getAttribute("href")); // second arg, defaults to "body"
		// 	};
		// }

		_setLinks(handler, query);
	};


	/**
	 * This will set the html on init, and when we load new
	 */
	function _setLinks(handler, query) {

		// if handler is not a function, set default handler (load full body)
		if (!handler) {
			handler = function(target) {

				// "this" will be bound, and
				_getHtml(target.href); //target.getAttribute("href")); // second arg, defaults to "body"
			};
		}

		// if query is missing, set to all links
		// attach "a" to query e.g. "body a"
		if (!query) {
			query = "body";
		}
		query = query + " a";

		// loop each mathing element
		$(query).each(function(e) {

			// this will loop through all the elements in the query and
			// remove the previous click event, and attach a new one
			$(this).off("click").on("click", function(e) {

				// the handler is the passed in handler of what the link is to
				// do. default handler (no function given) will just fetch the
				// href html
				handler(e.target);

				// blur the link
				this.blur();

				// update push state
				//...

				// prevent browser from doing it's normal link thing
				e.preventDefault();
			});
		});
	}

	/**
	 * This will load the url and set the html
	 * @param string url The url to get
	 * @param string query The jQuery selector to extract and write
	 */
	var _getHtml = function(url, query, handler) {

		if (!query) {
			query = "body";
		}

		// get the html from the server
		$.ajax({
			url: url,
			cache: false,
			success: function(html) {

				// get the title
				var newTitle = html.split(/(<title[^>]*>|<\/title>)/ig)[2];

				// get the html by query
				// TODO only fetch within the html, concat as may be multiples
				var newHtml = html.split(/(<body[^>]*>|<\/body>)/ig)[2];
				if (newHtml) {

					// strip <script> tags within the harvested section
					// script tags may cause problems if same script is run again
					newHtml = newHtml.replace(/<script[^>]*>/gi, ' <!-- //removed script').replace(/<\/script>/gi, ' --> ');

					// append compiled section to our page
					// set the new title
					$(query).html(newHtml);
					document.title = newTitle;

					// Set the links of the new html
					_setLinks(handler, query)
				}
			}
		});
	};


	return _this = {

		// // public properties
		//
		// // (default) options can be set at run-time (ideally before window.onload() )
		// options: {
		// 	autoScripts: false, // run scripts within the <body> tag of loaded pages
		// 	autoCache: true, // automatically cache pages. If false, <a data-cache="true"... will need to be set
		// 	cacheFirstPage: true
		// },

		// useCache: _useCache, // for unit testing purposes

		init: _init,
		getHtml: _getHtml,

	}

})();
