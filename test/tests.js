// pages.cache



/*(function() {

  // configure pages
  pages.options.cacheFirstPage = false; // we don't want to cache first page here
  pages.options.autoScripts = false;
  pages.options.autoCache = true;

  var location, data;
  
  test("test cache#insert", function() {
    
    // ensure that cache is empty here
    pages.cache.empty();
    
    // insert our data
    location = "http://www.example.com/";
    data = "<p>Hello world!</p>";
    
    // run tests
    equal(pages.cache.insert(location, data), data); // returns cached item
  });
  
  
  
  test("test cache#get with location passed", function() {
    
    // insert our data
    location = "http://www.example.com/";
    data = "<p>Hello world!</p>";
    
    pages.cache.insert(location, data)
    
    // run tests
    equal(pages.cache.get(location), data); // location passed
  });
  
  
  
  test("test cache#get with no params", function() {
    
    // insert our data
    location = "http://www.example.com/";
    data = "<p>Hello world!</p>";
    
    pages.cache.insert(location, data);
    
    // run tests
    equal(pages.cache.get()[location], data); // no params
  });
  
  test("test cache#empty empties cache", function() {
    
    // insert our data
    location = "http://www.example.com/";
    data = "<p>Hello world!</p>";
    
    pages.cache.insert(location, data);
    
    pages.cache.empty();
    
    // run tests
    equal(pages.cache.get(location), undefined);
  });
  
}());*/








// pages#useCache

(function() {

  
  
  // data-cache='', autoCache=true
  
  // data-cache='', autoCache=false
  
  test("pages#useCache (data-cache='', autoCache=true)", function() {
    
    var link, location;
    
    // test criteria
    link = document.getElementById("example");
    pages.options.autoCache = true;
    location = "http://www.example.com/";
    
    // run tests
    equal(pages.useCache( link, location ), true);
    
  });
  
  
  test("pages#useCache (data-cache='', autoCache=false)", function() {
    
    var link, location;
    
    // test criteria
    link = document.getElementById("example");
    pages.options.autoCache = false;
    location = "http://www.example.com/";
    
    // run tests
    equal(pages.useCache( link, location ), false);
    
  });
  
  
  
  
  
  
  
  // data-cache='true', autoCache=true
  
  // data-cache='true', autoCache=false

  // configure pages
  pages.options.autoCache = true;
  
  test("pages#useCache (data-cache='true', autoCache=true)", function() {
    
    var link, location;
    
    // test criteria
    link = document.getElementById("example_true");
    pages.options.autoCache = true;
    location = "http://www.example.com/";
    
    // run tests
    equal(pages.useCache( link, location ), true);
    
  });
  
  
  test("pages#useCache (data-cache='true', autoCache=false)", function() {
    
    var link, location;
    
    // test criteria
    link = document.getElementById("example_true");
    pages.options.autoCache = false;
    location = "http://www.example.com/";
    
    // run tests
    equal(pages.useCache( link, location ), true);
  });
  
  
  
  
  
  
  
  // data-cache='false', autoCache=true
  
  // data-cache='false', autoCache=false

  // configure pages
  test("pages#useCache (data-cache='false', autoCache=true)", function() {
    
    var link, location;
    
    // test criteria
    link = document.getElementById("example_false");
    pages.options.autoCache = true;
    location = "http://www.example.com/";
    
    // run tests
    equal(pages.useCache( link, location ), false);
    
  });
  

  test("pages#useCache data-cache='false', autoCache=false", function() {
    
    var link, location;

    // test criteria
    link = document.getElementById("example_false");
    pages.options.autoCache = false;
    location = "http://www.example.com/";
    
    // run tests
    equal(pages.useCache(link, location ), false);
  });
  
}());
