var logger = _req('src/logger').create('controller-api');
var handlers = [
    {path: '/api', mod: _req('src/api/global')}
];

module.exports = {
    init: function(express) {
        handlers.forEach(function(handler) {
            express.use(handler.path, handler.mod.router);
            logger.info('Api point "%s" successfully mapped.', handler.path);
        });
        return this;
    }
};

