QUnit.module( "loaded.dispatch", function(hooks) {

    // ====================================
    // tests

    QUnit.test( "Test setConfig with object", function( assert ) {

        loaded.dispatch.setData("mydata");
        var stored = loaded.dispatch.getData();

        assert.equal( "mydata", stored );
    });


    QUnit.module( "loaded.dispatch.setConfig", function(hooks) {

        // ====================================
        // setup

        hooks.beforeEach( function() {
            loaded.dispatch.setConfig("mykey", null);
        } );

        // ====================================
        // tests

        QUnit.test( "Test setConfig with object", function( assert ) {

            loaded.dispatch.setConfig({
                "mykey": "myvalue"
            });
            var stored = loaded.dispatch.getConfig("mykey");

            assert.strictEqual( "myvalue", stored );
        });

        QUnit.test( "Test setConfig with name/value", function( assert ) {

            loaded.dispatch.setConfig("mykey", "myvalue");
            var stored = loaded.dispatch.getConfig("mykey");

            assert.strictEqual( "myvalue", stored );
        });

        QUnit.test( "test default config values are set", function( assert ) {

            assert.strictEqual( loaded.dispatch.getConfig("container_id"), "loaded-content" );
            assert.strictEqual( loaded.dispatch.getConfig("templates_dir"), "/templates" );
            assert.strictEqual( loaded.dispatch.getConfig("debug_mode"), false );
        });

    });

});
