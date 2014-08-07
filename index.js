var _isUndefined    = require( 'lodash-node/compat/objects/isUndefined' );
var _isString       = require( 'lodash-node/compat/objects/isString' );
var _isObject       = require( 'lodash-node/compat/objects/isObject' );
var _isNumber       = require( 'lodash-node/compat/objects/isNumber' );

// Constants
var COOKIE_DELIMITER_RE = /;\s*/;
var KEY_VALUE_DELIMITER = '=';
var DEFAULT_PATH        = '/';
var DAYS_RE             = /([0-9]+)\s+day/;

/**
 * Gets current date + n days in seconds since
 * @param  {string} days
 * @return {number}
 */
var getDate = function ( days ) {
    var parsedDays = parseInt( days, 10 );
    var date = new Date();
    return date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
};

/**
 * Gets cookie value
 * @param  {string}     cookieName
 * @return {string}
 */
var get = function ( cookieName ) {
    if ( !_isString( cookieName ) ) {
        throw new TypeError( 'cookieName argument is required and must be a string' );
    }

    var cookieArray = this.doc.cookie.split( COOKIE_DELIMITER_RE );

    for ( var i = 0; i < cookieArray.length; ++i ) {
        var cookieNamedPair = cookieArray[ i ].split( KEY_VALUE_DELIMITER );
        var key             = decodeURIComponent( cookieNamedPair[ 0 ] );
        
        if ( key === cookieName ) {
            return decodeURIComponent( cookieNamedPair[ 1 ] );
        }
    }
    return undefined;
};

/**
 * Sets cookie value
 * @param   {string}                  key               Name of cookie
 * @param   {string|number|boolean}   value             New value for cookie
 * @param   {object}                  [opts]            Options object
 * @param   {string}                  [opts.path]       Path to write cookie (write to root domain by default)
 * @param   {number|string}           [opts.expires]    Expiration for cookie
 * @returns {string}                                    New cookie value
 *
 * @example
 * Expiration argument can be either a number (you do the math yourself) or a string in one of the following forms:
 *      '11 days'
 *      '1 day'
 */
var set = function ( key, value, opts ) {
    if ( !_isString( key ) ) {
        throw new TypeError( 'key argument is required and must be a string' );
    }

    if ( _isUndefined( value ) || _isObject( value ) ) {
        throw new TypeError( 'value must be defined and cannot be an object' );
    }

    opts = opts || {};
    opts.path = _isString( opts.path ) ? opts.path : DEFAULT_PATH;

    var newCookie = encodeURIComponent( key ) + '=' + encodeURIComponent( value );

    if ( DAYS_RE.test( opts.expires ) ) {
        newCookie += '; expires=' + getDate( opts.expires.match( DAYS_RE )[ 1 ] );
    } else if ( _isNumber( opts.expires ) ) {
        newCookie += '; expires=' + opts.expires;
    }

    newCookie += '; path=' + encodeURIComponent( opts.path );
    this.doc.cookie = newCookie;
    return newCookie;
};

/**
 * Initializes cookie cutter
 * @param  {object}     doc     Reference to window.document
 */
var init = function ( doc ) {
    if ( _isUndefined( doc ) ) {
        throw new Error( 'document argument is required' );
    }

    if ( _isUndefined( doc.cookie ) ) {
        doc.cookie = '';
    }
    
    this.doc = doc;
};

module.exports = {
    doc: null,
    init: init,
    get: get,
    set: set
};