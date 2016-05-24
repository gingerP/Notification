var utils = _req('src/utils');
var log = _req('src/logger').create('global');
var express = require('express');
var router = express.Router();
const notifier = require('node-notifier');
const path = require('path');

var controller = (function() {
    var api;
    var TITLE_HANDSHAKE = 'Handshake';
    var TITLE_INCOMING_CALL = 'Incoming call!';


    function execNotify(title, message) {
        notifier.notify({
            title: title,
            message: message || '',
            icon: path.join(__dirname, 'phone.png')
        });
    }

    function incomingCall(request, response, callback) {
        log.info('incomingCall Ok');
        execNotify(TITLE_INCOMING_CALL);
        callback('incomingCall Ok');
    }

    function handshake(request, response, callback) {
        log.info('handshake Ok');
        execNotify(TITLE_HANDSHAKE);
        callback('handshake Ok');
    }

    api = {
        incomingCall: incomingCall,
        handshake: handshake
    };
    return api;
})();
utils.linkRequestsToModule([
    {path: '/incoming_call', method: 'incomingCall', async: true},
    {path: '/handshake', method: 'handshake', async: true}
], controller, router, 'post');
module.exports = {
    router: router,
    class: controller,
    instance: controller
};
