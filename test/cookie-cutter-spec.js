require( 'should' );

var cookieCutter = require( '../index.js' );

var initCookieCutter = function ( cookie ) {
	var doc = {
		cookie: cookie
	};
	cookieCutter.init( doc );
};

describe( 'Cookie Cutter', function () {

	describe( 'Getter', function () {
		it( 'returns a cookie value given a name that exists', function () {
			initCookieCutter( 'foo=bar' );
			var result = cookieCutter.get( 'foo' );
			result.should.equal( 'bar' );
		});

		it( 'returns undefined given a cookie name that does not exist', function () {
			initCookieCutter( 'foo=bar' );
			var result = cookieCutter.get( 'baz' );
			( typeof result === 'undefined' ).should.be.true;
		});

		it( 'throws an error if the cookie name argument is not a string', function () {
			initCookieCutter( 'foo=bar' );
			(function () {
				var result = cookieCutter.get( 1 );
			}).should.throw();

			(function () {
				var result = cookieCutter.get( [] );
			}).should.throw();

			(function () {
				var result = cookieCutter.get( function () {} );
			}).should.throw();

			(function () {
				var result = cookieCutter.get( {} );
			}).should.throw();

			(function () {
				var result = cookieCutter.get( null );
			}).should.throw();

			(function () {
				var result = cookieCutter.get( undefined );
			}).should.throw();
		});
	});

	describe( 'Setter', function () {
		it( 'throws an error if the key argument is not a string', function () {
			initCookieCutter( 'foo=bar' );
			(function () {
				var result = cookieCutter.set( 1, 'baz' );
			}).should.throw();

			(function () {
				var result = cookieCutter.set( [], 'baz' );
			}).should.throw();

			(function () {
				var result = cookieCutter.set( function () {}, 'baz' );
			}).should.throw();

			(function () {
				var result = cookieCutter.set( {}, 'baz' );
			}).should.throw();

			(function () {
				var result = cookieCutter.set( null, 'baz' );
			}).should.throw();

			(function () {
				var result = cookieCutter.set( undefined, 'baz' );
			}).should.throw();
		});

		it( 'throws an error if the value argument is undefined or an object', function () {
			initCookieCutter( 'foo=bar' );
			(function () {
				var result = cookieCutter.set( 'foo', {} );
			}).should.throw();

			(function () {
				var result = cookieCutter.set( 'foo', undefined );
			}).should.throw();
		});

		it( 'creates a cookie with a default path of "/" given a valid key/value and no path argument', function () {
			initCookieCutter( 'foo=bar' );
			var result = cookieCutter.set( 'foo', 'baz' );
			result.should.equal( 'foo=baz; path=%2F' );
		});

		it( 'creates a cookie with a customized path with the path option is present', function () {
			initCookieCutter( 'foo=bar' );
			var result = cookieCutter.set( 'foo', 'baz', { path: '/bat' } );
			result.should.equal( 'foo=baz; path=%2Fbat' );
		});

		it( 'creates a cookie with a expiration parameter and default path if the expires option is a number and path is undefined', function () {
			initCookieCutter( 'foo=bar' );
			var result = cookieCutter.set( 'foo', 'baz', { expires: 1 } );
			result.should.equal( 'foo=baz; expires=1; path=%2F' );
		});

		it( 'creates a cookie with a expiration parameter and default path if the expires option is in the day friendly form and path is undefined', function () {
			initCookieCutter( 'foo=bar' );
			var validCookie = /foo=baz; expires=[0-9]+; path=%2F/;
			var result = cookieCutter.set( 'foo', 'baz', { expires: '2 days' } );
			( validCookie.test( result ) ).should.be.true;
		});
	});
});