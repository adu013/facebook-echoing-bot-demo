'use strict';

const request = require('request');

// Custom modules
var handler = require('handler');

/**
 * Function to verify facebook webhook
 */
module.exports.fbVerify = (event, context, callback) => {
    if (event.query['hub.mode'] === 'subscribe' &&
        event.query['hub.verify_token'] === 'your_verify_token') {
        console.log("Validating webhook");
        return callback(null, parseInt(event.query['hub.challenge']));
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        return callback('Invalid token');
    }
};

/*
 * Function to reply to other messages
 */
module.exports.fbMessages = (event, context, callback) => {
    event.body.entry.map((entry) => {
        entry.messaging.map((messagingItem) => {
            if(messagingItem.message && messagingItem.message.text) {
              echoMessage = "You said: " + messagingItem.message.text;
              handler.typingIndicator(messagingItem.sender.id, true);
              handler.sendMessage(messagingItem, echoMessage);
            }
        });
    });
};
