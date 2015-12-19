// the function passed with init is use to set dom elements of the
// new html loaded from the server each time. on the first run, it is set
// run against the body element (and all elements contained within)
$(function() {

    // options to init with
    var options = {
        cache: false,
        run_scripts: false,
        run_inline_scripts: false,
        run_external_scripts: false,
        method: "get",
        data: {},
        init_links: true,
        init_forms: true
    };

    // initialize the library
    n4s.init(function() {
        // new html init stuff here
    }, options);
});
