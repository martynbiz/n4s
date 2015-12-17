$(function() {
    console.log("app.js");

    // init passed with a function can add some additional stuff
    // with no function passed, just the default init (all links)
    n4s.app.init(function(target) {
        console.log("assigning behaviour");
        n4s.app.getHtml(target.href);
    }, "body");
})
