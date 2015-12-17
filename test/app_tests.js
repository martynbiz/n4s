QUnit.module( "n4s.app", function(hooks) {

    // MockHttpServer is used to mock the xmlhttprequest calls
    // https://github.com/philikon/MockHttpRequest
    var server = new MockHttpServer();

    // this will start the MockHttpServer server so that xmlhttprequest object
    // is not used for http requests
    hooks.beforeEach( function() {
        server.start();
    } );

    // we'll also stop the server after each test, just to keep things tidy
    hooks.afterEach( function() {
        server.stop();
    } );

    // this will be set in each test. the request handle function is
    // set to shift items from this array. By doing this we can create
    // data for consecutive calls within the same test.
    // e.g. dataProvider = [FIRST_CALL_TEXT, SECOND_CALL_TEXT]
    var dataProvider = [];
    var statusCode = 200;

    // setup some constants as test data from the server
    // *_TEXT will simulate a raw text response (not json parsed)
    var FIRST_CALL_TEXT = '"first call"', // no JSON parsing
        SECOND_CALL_TEXT = '"second call"',
        FIRST_CALL_JSON = 'first call', // after JSON parsing
        SECOND_CALL_JSON = 'second call';

    // this is the handler for tests. set dataProvider in each test
    server.handle = function (request) {
        request.setResponseHeader("Content-Type", "application/robot");
        request.receive(statusCode, dataProvider.shift());
    };

    QUnit.module( "200 status", function(hooks) {

        // set the status code to be 200
        hooks.beforeEach( function() {
            statusCode = 200;
        } );

        // ====================================
        // tests

        QUnit.test( "Test send returns expected data", function( assert ) {

            dataProvider = [FIRST_CALL_TEXT];

            n4s.http.send({
                success: function(actualData) {
                    assert.equal( FIRST_CALL_TEXT, actualData );
                },
                url: 'some_resource.php',
            });


        });

    //     QUnit.test( "Test send when get_cached is not set (default: false)", function( assert ) {
    //
    //         dataProvider = [FIRST_CALL_TEXT, SECOND_CALL_TEXT];
    //
    //         n4s.http.send({
    //             success: function(actualData) {
    //                 assert.equal( FIRST_CALL_TEXT, actualData );
    //             },
    //             url: 'some_resource.php',
    //         });
    //
    //         n4s.http.send({
    //             success: function(actualData) {
    //                 assert.equal( SECOND_CALL_TEXT, actualData );
    //             },
    //             url: 'some_resource.php',
    //         });
    //     });
    //
    //     QUnit.test( "Test send when get_cached is true", function( assert ) {
    //
    //         dataProvider = [FIRST_CALL_TEXT, SECOND_CALL_TEXT];
    //
    //         n4s.http.send({
    //             success: function(actualData) {
    //                 assert.equal( FIRST_CALL_TEXT, actualData );
    //             },
    //             url: 'some_resource.php',
    //         });
    //
    //         n4s.http.send({
    //             success: function(actualData) {
    //                 assert.equal( FIRST_CALL_TEXT, actualData );
    //             },
    //             url: 'some_resource.php',
    //             get_cached: true
    //         });
    //     });
    //
    //     QUnit.test( "Test send when data_type is 'json'", function( assert ) {
    //
    //         dataProvider = [FIRST_CALL_TEXT];
    //
    //         n4s.http.send({
    //             success: function(actualData) {
    //                 assert.equal( FIRST_CALL_JSON, actualData );
    //             },
    //             url: 'some_resource.php',
    //             data_type: "json"
    //         });
    //     });
    //
    // });
    //
    // QUnit.module( "Error statuses", function(hooks) {
    //
    //     // set the status code to indicate an error
    //     hooks.beforeEach( function() {
    //         statusCode = 500;
    //     } );
    //
    //     // ====================================
    //     // tests
    //
    //     QUnit.test( "Test send handles errors", function( assert ) {
    //
    //         n4s.http.send({
    //             success: function(data) {
    //                 assert.equal(1, 2, "Wrong handler called");
    //             },
    //             error: function(data) {
    //                 assert.equal(1, 1);
    //             },
    //             url: 'some_resource.php',
    //         });
    //
    //     });
    //
    //     QUnit.test( "Test data is passed into error handler", function( assert ) {
    //
    //         dataProvider = [FIRST_CALL_TEXT];
    //
    //         n4s.http.send({
    //             error: function(data) {
    //                 assert.equal(data, FIRST_CALL_TEXT);
    //             },
    //             url: 'some_resource.php',
    //         });
    //
    //     });
    //
    //     QUnit.test( "Test getLastResponse()", function( assert ) {
    //
    //         dataProvider = [FIRST_CALL_TEXT];
    //
    //         n4s.http.send({
    //             error: function(data) {
    //                 var response = n4s.http.getLastResponse();
    //                 assert.equal(response.status, 500);
    //                 assert.equal(response.data, FIRST_CALL_TEXT);
    //             },
    //             url: 'some_resource.php',
    //         });
    //
    //     });

    });

});
