var exports = module.exports = function (doc) {
    if (!doc) doc = {};
    if (typeof doc === 'string') doc = { cookie: doc };
    if (doc.cookie === undefined) doc.cookie = '';
    
    var self = {};
    self.get = function (key) {
        var splat = doc.cookie.split(/;\s*/);
        for (var i = 0; i < splat.length; i++) {
            var ps = splat[i].split('=');
            var k = unescape(ps[0]);
            if (k === key) return unescape(ps[1]);
        }
        return undefined;
    };
    
    self.set = function (key, value, opts) {
        if (!opts) opts = {};
        var s = escape(key) + '=' + escape(value);
        if (opts.expires) s += '; expires=' + opts.expires;
        if (opts.path) s += '; path=' + escape(opts.path);
        doc.cookie = s;
        return s;
    };

    self.delete = function (key) {
      self.set(key, '', { expires: Date(0) });
    };

    return self;

};

if (typeof document !== 'undefined') {
    var cookie = exports(document);
    exports.get = cookie.get;
    exports.set = cookie.set;
    exports.delete = cookie.delete;
}
