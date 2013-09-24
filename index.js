var exports = module.exports = function (doc) {
    if (!doc) doc = {};
    if (typeof doc === 'string') doc = { cookie: doc };
    if (doc.cookie === undefined) doc.cookie = '';
    
    var self = {};
    self.get = function (key, opts) {
        if (!opts) opts = {};
        var decode = opts.decode || unescape;
        var splat = doc.cookie.split(/;\s*/);
        for (var i = 0; i < splat.length; i++) {
            var ps = splat[i].split('=');
            var k = decode(ps.shift());
            if (k === key) return decode(ps.join('='));
        }
        return undefined;
    };
    
    self.set = function (key, value, opts) {
        if (!opts) opts = {};
        var encode = opts.encode || escape;
        var s = encode(key) + '=' + encode(value);
        if (opts.expires) s += '; expires=' + opts.expires;
        if (opts.path) s += '; path=' + encode(opts.path);
        doc.cookie = s;
        return s;
    };
    return self;
};

if (typeof document !== 'undefined') {
    var cookie = exports(document);
    exports.get = cookie.get;
    exports.set = cookie.set;
}
