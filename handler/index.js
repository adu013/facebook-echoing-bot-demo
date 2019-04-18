// Dependencies
const request = require("request");

// Access token for facebook page
access_token = ACCESS_TOKEN;
const FB_SEND_MESSAGE_URL = `https://graph.facebook.com/v2.6/me/messages?access_token=` + access_token;

// Function to show typing indicator to sender
function typingIndicator(senderId, isTyping) {
  var senderAction = isTyping ? 'typing_on' : 'typing_off';
  request({
    url: FB_SEND_MESSAGE_URL,
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      sender_action: senderAction
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending typing indicator to user: ' + error);
    } else if (response.body.error) {
      console.log('Error sending typing indicator to user: ' + response.body.error);
    }
  });
}

// This function sends text message to the facebook user
function sendMessage(messagingItem, textMessage) {
  request({
    url: FB_SEND_MESSAGE_URL,
    method: 'POST',
    json: {
      recipient: {
        id: messagingItem.sender.id
      },
      message: {
        text: textMessage
      }
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message to user: ' + error);
    } else if (response.body.error) {
      console.log('Error sending message to user: ' + response.body.error);
    }
  });
}

exports.typingIndicator = typingIndicator
exports.sendMessage = sendMessage
