var isArray = require('./isArray');

var func = function ( object, base ){
    var queryString = []
    for ( var key in object ){
        var value = object[key];
        if ( base ){
            key = base + '[' + key + ']';
        }
        var result;
        if ( isArray(value) ){
            var qs = {};
            for ( var i in value ){
                var val = value[i];
                qs[i] = val;
            }
            result = func( qs, key );
        } else if ( value != null && typeof value == 'object' ) {
            result = func(value, key);
        } else {
            result = key + '=' + encodeURIComponent(value);
        }
        if ( value !== null ) {
            queryString.push( result );
        }
    }
    return queryString.join('&');
}

module.exports = func;
