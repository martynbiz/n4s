# N4S Links

Similar to Rails turbolinks. Will replace links in HTML with AJAX loaded links. Allows for caching too.

thoughts:
- use n4s links for all links
- use loaded for template sections (e.g. pagination, search)

```javascript
n4s.config({

});

// convert all links to n4s links ;)
// existing link behaviour will be overwritten
n4s.init(); // n4s.loadHTML(this.href);

// ^ default, no args
n4s.init("a", function(e) {
  n4s.loadHTML(this.href, "body"); // extract body, and load to body
}


n4s.init({
    runScripts: true,
});


// pagination - first arg is query selector, second is override click function on links (blur, push state, etc will still be dealt with)
// existing link behaviour will be overwritten
n4s.init(".account-pagination a", function(e) {

  // this requires the server to provide the template files, and href to also return json
  //n4s.dispatcher.loadTemplate("/templates/accounts/table.mustache", {//...container?});
  //n4s.dispatcher.loadData(this.href);

  // this way requires no additional work on the server, but envokes the full app
  n4s.loadHTML(this.href, "#accountRows"); // will fetch the full html, concat the matching #accountRows html, write to #accountRows
});

// convert sections (pagination, table order, search)
$(".account-pagination a").each(function(e) {
  this.off().on(function() {
    loaded.dispatch.loadTemplate("/templates/accounts/table.mustache");
    loaded.dispatch.loadData(this.href);

    n4s.setLinks();

    // update history?
  });
});
```
