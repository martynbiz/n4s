/**
 * @name n4s
 * @module n4s
 * @desc Load HTML by ajax to reduce page rendering times
 * @author Martyn Bissett
 * @version 0.0.0
 * @requires jQuery
 */

 // TODO handle hash links e.g. products.php#table
 // TODO if form method missing, default POST?
 // TODO cache should store register by query string too (get params)

 /**
  * An instance for storing and retrieving data
  * External to ajax encase I wanna use it throughout the app
  */
 n4s = (function() {

	/**
	 * This is the function that is run when we have new HTML (e.g. set onclick)
	 * It is passed in with init()
	 * @var function
	 */
	var _handler = function() {
		// empty by default
	};

	/**
	 * Options for the library (e.g. cache pages)
	 * @var object
	 */
	var _options = {};

    /**
     * Cache will allow us to store pages, helpful for restoring back button
     * without having to loadHtml again
     * @var object
     */
    var _cache = {};

    /**
     * This is the current pathname so we don't run popstate handler when only
     *   #hash has
     * @var string
     */
    var _currentPathName = location.pathname;

	/**
	 * This will initiate elements by query
 	 * @param function callback This is the callback for new and initial html
	 * @param string query jQuery selector
	 * @param void
	 */
	var _init = function(handler, options) {

        // overwrite default options with passed in options
        _options = $.extend({

            // get from cache?
            // boolean
            cache: false,

            // when html is loaded, will we run inline scripts?
            // boolean
            run_scripts: false,

            // when html is loaded, will we run inline scripts within body tag
            // will override run_scripts
            // TODO this
            // boolean
            run_inline_scripts: false,

            // when html is loaded, will we run external scripts within body tag
            // will override run_scripts
            // TODO this
            // boolean
            run_external_scripts: false,

            // extract and replace only a section of the page
            container_query: "body",

            // the default method for fetching html
            // string get|post
            method: "get",

            // the default data to send with requests (for links not required)
            // object
            data: {},

            // init links with ajax loading
            // boolean
            init_links: true,

            // init forms with ajax loading
            // boolean
            init_forms: true
        }, options);

		// set event listener for push state changed
        // this will fire when the back button is pressed, we will loaded the
        // new page based on the updated current pathname
        window.addEventListener('popstate', function(event) {
            // if in cache, restore from there
            // else, get html
            // note: get params will be cached, but not post. only the last post
            //   to an action page will be cached

            // this condition just checks if the path has changed, as #hash will also
            // trigger this event
            if (location.pathname != _currentPathName) {
                var cached = _cache[location.pathname];
                if (cached) {
                    document.title = cached.title;
                    $("body").html(cached.html);
                    _setHtml();
                }

                // set new currentPathName
                _currentPathName = location.pathname;
            }
        });

		// store the init as we'll need it again when we have new html
		if (typeof handler === "function") {
			_handler = handler;
		}

        // set the html
		_setHtml(_options);
	};

    /**
     * Cache current title and html (this will occur in init, and success)
     */
    function _cacheHtml() {
        _cache[location.pathname] = {
            title: document.title,
            html: $("body").first().html()
        };
    }


	/**
	 * This will set the links of the new html. it will also call the user defined
     * _handler function
	 */
	function _setHtml(options) {

        // set options (use _options if not given)
        options = (options) ? options : _options;

        // we'll cache every new page for the back button and if caching it on
        _cacheHtml();

		// loop through each link and assign onclick event listener
        if (options['init_links']) {

            // only get links with href (so name="..." is not picked up)
            $("a[href]").each( function(index, a) {

                if ($(this).attr('href').match(/^#/)) { // e.g. #table and #
                    // TODO handle hash e.g. #table
                } else if ($(this).attr('href').match(/#/)) { // e.g. products.php#table
                    // TODO handle hash e.g. products.php#table
                } else {
                    $(a).on("click", function(e) {

            			// load the HTML
            			_loadHtml(this);

            			// blur the link
            			this.blur();

            			// don't let the browser load do handle the link click
            			e.preventDefault();
            		});
                }

            });
        }

        // loop through each form and handle submission via ajax
        if (options['init_forms']) {
            $("form").each( function() {

                $(this).on("submit", function(e) {

                    var form = e.target;

                    // compile data from elements' value
                    var data = {};
                    $("input, select, textarea", form).each(function(){
                        data[this.name] = $(this).val();
                    });

                    //
                    n4s.loadHtml(form.action, {
                        "method": form.method,
                        "data": data
                    });

                    return false;
                });
            });
        }

        _handler();
	}

	/**
	 * This will load the url and set the html
	 * @param string url The path (href) to get html
	 * @return void
	 */
	var _loadHtml = function(url, options) {

        // overwrite default options with passed in options
        // the first argument ensures we create a new object as we don't want to
        // overwrite the default _options
        options = $.extend({}, _options, options);

		// get the html from the server
        // some of the ajax options (e.g. data) can be overwritten in this method
		$.ajax({
			url: url,
			cache: options['cache'],
            method: options['method'] ? options['method'] : "get",
            data: options['data'] ? options['data'] : {},
			success: function(html) {

                // update push state
                history.pushState({}, '', this.url);

				// get the title
				var newTitle = html.split(/(<title[^>]*>|<\/title>)/ig)[2];

				// get the html by query
				var newHtml = html.split(/(<body[^>]*>|<\/body>)/ig)[2];

				// newHtml could be empty if query is not "body"
				if (newHtml) {

                    // if container is set, then combine the html for matching
                    // elements from the retrieved html for newHtml
                    if (options["container_query"].toLowerCase() != "body") {
                        var a = [];
                        var tempContainer = document.createElement("DIV");
                        tempContainer.innerHTML = newHtml;
                        $(options["container_query"], tempContainer).each(function(index, el) {
                            a.push(el.innerHTML);
                        });
                        newHtml = a.join("");
                    }

					// strip <script> tags within the harvested section
					// script tags may cause problems if same script is run again
                    if (!options['run_scripts']) {
                        newHtml = newHtml.replace(/<script[^>]*>/gi, ' <!-- //removed script').replace(/<\/script>/gi, ' --> ');
                    }

					// append compiled section to our page
					// set the new title
					$(options["container_query"]).html(newHtml);
					document.title = newTitle;

					// Call init again as it will
					_setHtml(options);
				}
			}
		});
	};

    // public properties
	return _this = {
		init: _init,
		loadHtml: _loadHtml
	}

})();
