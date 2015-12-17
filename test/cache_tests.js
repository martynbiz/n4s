QUnit.module( "n4s.cache", function(hooks) {

    var mykey = 'mykey',
        myvalue = 'myvalue';

    // ====================================
    // tests

    QUnit.test( "Test get/set", function( assert ) {

        n4s.cache.set(mykey, myvalue);
        var stored = n4s.cache.get(mykey);

        assert.equal( myvalue, stored );
    });

});
