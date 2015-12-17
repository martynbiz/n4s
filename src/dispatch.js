
if(typeof loaded === "undefined") loaded = {};

/**
 * Will load and render templates and data
 * Should be initiated with a handler for when html is rerendered
 *
 * Usage:
 *
 * loaded.dispatch.loadTemplate(templatePath); // ajax load, call render
 * loaded.dispatch.loadData(dataPath); // ajax load, call render
 *
 * Dependencies: ajax, utils
 *
 */
loaded.dispatch = (function() {

    /**
     * @var array Stores templates indexed by their url
     */
    var _templatesCache = {};

    /**
     * @var string Stores the current template
     */
    var _template = null;

    /**
     * @var boolean Once the template is loaded, this should be set to true
     */
    var _templateReady = true;

    /**
     * @var mixed Stores the current data
     */
    var _data = null;

    /**
     * @var boolean Once the data is loaded, this should be set to true
     */
    var _dataReady = true;

    /**
     * @var object
     */
    var _config = {

        // where the library can find templates rather than having to
        // specify full path every time when defining routes
        "templates_dir": "/templates",

        // this is the container that will take the rendered html
        "container_id": "loaded-content",

        // debug mode allows us to switch of link default behaviour so we
        // can view js error messages before the page reloads
        "debug_mode": false,

        // this is the render function to handle the template and data from the
        // server
        "render": function() {
            console.log("loaded.dispatch: config.render function not defined");
        },

        // this is the render function to handle the template and data from the
        // server
        "error": function() {
            console.log("loaded.dispatch: config.error_handler function not defined");
        }
    };

    /**
     * Once the template has loaded, this will set the template and flag
     * @param string template The template html etc
     */
    var _setTemplate = function (template) {
        _template = template;
        _templateReady = true;
    };

    /**
     * Return the stored data
     */
    var _getData = function () {
        return _data;
    };

    /**
     * Once the data has loaded, this will set the data and flag
     * @param string data The data for the template
     */
    var _setData = function (data) {
        _data = data;
        _dataReady = true;
    };

    /**
     * Will load the template
     * @param string templatePath The path to the template file
     */
    _loadTemplate = function(templatePath, options) {

        // set default options
        options = loaded.utils.extend({
            get_cached: true
        }, options);

        // attach templates_dir
        templatePath = _config['templates_dir'] + templatePath;

        var cached = _templatesCache[templatePath];

        // load the template
        if (cached) {
            _setTemplate(cached);
            _render();
        } else {

            _template = null;
            _templateReady = false;

            loaded.http.send({
                url: templatePath,
                method: "GET",
                get_cached: options.get_cached,
                success: function (html) {
                    _setTemplate(html);
                    _render();
                }
            });
        }
    }

    /**
     * Will load the data for the template
     * @param string dataPath The path to the resource (e.g. /accounts/1)
     */
    function _loadData(dataPath, options) {

        // set default options
        options = loaded.utils.extend({
            get_cached: false,
        }, options);

        // load the data
        if (dataPath) {

            _data = null;
            _dataReady = false;

            loaded.http.send({
                url: dataPath,
                method: "GET",
                data_type: "json",
                get_cached: options.get_cached,
                success: function (data) {
                    _setData(data);
                    _render();
                },
                error: function() {
                    var response = loaded.http.getLastResponse();
                    _config.error(response);
                }
            });
        }
    }

    /**
     * The function that is called when the ajax requests have ended
     * It will only run fully when all ajax (template and data) are ready
     * @return void
     */
    var _render = function () {

        // this only passes when we have both sets of data
        if (!_templateReady || !_dataReady) {
            return false;
        }

        // render with out developer defined render function
        _config.render(_template, _data);

        // init new html
        loaded.dispatch.init( _getContainer() );
    };

    /**
     * Set config
     * @param object config New config to merge
     * @return object new config
     */
    var _setConfig = function (config, value) {

        // determine if we're merging a passed in object, or
        // a single name/value
        if (typeof config == "string") {
            _config[config] = value;
        } else {
            _config = loaded.utils.extend(_config, config);
        }

        return _config;
    };

    /**
     * Get config
     * @param object config New config to merge
     * @return object new config
     */
    var _getConfig = function (name) {

        return _config[name];
    };

    /**
     * Get container element
     * @return domElement
     */
    var _getContainer = function () {

        return document.getElementById( _config["container_id"] );
    };

    // /**
    //  * Will set the innerHTML of the configured "container_id" element
    //  * @param string content New html to set
    //  */
    // var _innerHTML = function (html) {
    //
    //     _getContainer().innerHTML = html;
    // };

    /**
     * Init the object by passing the handler when html is rendered to screen
     * @param function handler This will be run every time html is rendered
     * @return void
     */
    var _init = function(container) {

        if ( _getConfig("debug_mode") == true ) {
            console.log("Loaded: Debug mode is ON");
        }

        // set container to document by default
        container = container || document;

        // set all links on page
        var links = container.getElementsByTagName("a");
        for(var i=0; i<links.length; i++) {

            // set link click event behaviour
            links[i].addEventListener("click", function(e) {

                // debug mode allows us to see what is breaking the js without
                // the default brower behaviour loosing the js error in console
                if ( _getConfig("debug_mode") == true ) {
                    e.preventDefault();
                }

                // sometimes a link is present but not for navigation. an example
                // of this is bootstrap dropdown. in most case, the href will be
                // set to "#"
                if (this.getAttribute("href") == "#") {
                    return;
                }

                var link = this;

                // if a route exists for this url, load the page with ajax
                var result = loaded.router.match( this.getAttribute("href"), "GET" );
                var current_layout = loaded.router.getCurrentLayout();

                var hasLayout = (result && result.layout != undefined);
                var layoutChanged = (current_layout != null && result.layout != current_layout);
                if (hasLayout && layoutChanged) {

                    // return and let default <a> nature take it's course
                    // if layout is not null, and changed
                    return;

                }

                var isResultCallable = (result && typeof result.value === "function");
                if (isResultCallable) {

                    // call the result with, pass in the href
                    // this will load the template and data
                    result.value(link.href);

                    // update the browser url bar
                    history.pushState({}, '', link.href);

                    // blur link
                    link.blur();

                    // stop a standard http request
                    e.preventDefault();
                }

            }, false);
        }

        // set the layout based on the pathname
        var result = loaded.router.match( window.location.pathname, "GET" );

        // set the layout of this route. the dispatch(?) will determine whether we
        // need to reload the page if the layout changes
        if (result)
            loaded.router.setCurrentLayout( result.layout );

        // set event listener for push state changed
        // this will fire when the back button is pressed, we will loaded the
        // new page based on the updated current pathname
        window.addEventListener('popstate', function(event) {

            // this is somewhat similar to our code above but some differences
            // such as we need to fetch the result based on pathname, not href.
            // perhaps someway to DRY them both out a little?

            // if a route exists for this url, load the page with ajax
            var result = loaded.router.match( window.location.pathname, "GET" );
            var current_layout = loaded.router.getCurrentLayout();

            var hasLayout = (result && result.layout != undefined);
            var layoutChanged = (current_layout != null && result.layout != current_layout);
            if (hasLayout && layoutChanged) {

                // just reload
                window.location.href = window.location.pathname;
            }

            var isResultCallable = (result && typeof result.value === "function");
            if (isResultCallable) {

                // call the result with, pass in the href
                // this will load the template and data
                // TODO how to handle GETs
                result.value(window.location.pathname);
            }
        });
    };

    return {
        loadData: _loadData,
        loadTemplate: _loadTemplate,
        getConfig: _getConfig,
        setConfig: _setConfig,
        getData: _getData,
        setData: _setData,
        getContainer: _getContainer,
        init: _init,
    }
})();
