# N4S Links

Instead of reloading the entire HTML, images, CSS and JavaScript, this library allows every
link and form to load new HTML using AJAX. This means CSS and JavsScript doesn't need to be re-
rendered by updating the HTML only. This results in faster page loads, and less bandwidth
required. It is is customizable too so can be catered to different requirements.

## Installation ##

Below are three methods to install N4S:

### Manual download ###

Downloaded and include the script:

<script src="n4s.js"></script>

### Bower ###

Add the following to your bower.json file:

 "dependencies": {
   .
   .
   .
   "n4s": "git@github.com:martynbiz/n4s.git",
 }

### AMD module ###

Use as an AMD module (e.g. requirejs):

 ...

## Getting started ##

The following is all that is required to hijack links and form submissions:

```javascript
$(function() {
    n4s.init();
})
```

## init method ##

This is the method that will add the click event handlers to links and submit event handlers
to forms. It will load HTML when these events are triggers, and will initiate HTML when the
page is loaded and when new HTML is set in place.

### Callback function ###

As it's quite likely you'll want to assign event handlers to new HTML when the website
loads for the first time and when new HTML is loaded by AJAX, this callback function will
be run every time new HTML is loaded. Anything you want to set in such case should be
within this function.

```javascript
n4s.init(function() {
    // e.g. open welcome model (if present)
    $('#welcome').modal('show');
});
```

### Options ##

Options can be passed to enable further control of the library. For example, if you don't want
form submissions to be loaded by AJAX this can be switched off. The default options are
shown in below but can be overwritten:

```javascript
n4s.init(null, {

    // cache all html pages - good for static websites or get forms
    // not so good for websites with post forms, or dynamic pages
    // boolean
    cache: false,

    // when html is loaded, will we run scripts (inline and external within body tag).
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

    // init links with ajax loading
    // boolean
    init_links: true,

    // init forms with ajax loading
    // boolean
    init_forms: true
});
```

## loadHtml method ##

Links and forms when click/submitted will use the loadHtml to load new HTML. However, this
method is also available should you need to call it by itself for whatever reason.

```javascript
n4s.loadHtml(url, {
    method: "POST",
    data: {
        name: name
    }
});
```

Note: the same options given to init() function (e.g. run_scripts) can also be overwritten
here for this call only.

# TODO #

* handle redirects
* test?
