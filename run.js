var login = require('facebook-chat-api');
var users_position = new Array();

login({email: '', password: ''}, function callback (err, api) {
    if(err)
        return console.error(err);

    api.listen(function callback(err, message) {
        if (message.attachments[0]) {
            type = message.attachments[0].type;
            if (type == 'sticker') {

            } else if (type = 'share') {
                position_url = message.attachments[0].facebookUrl;

                pattern = /where1=(.*)%2C\+(.*)&FORM/;
                position = pattern.exec(position_url);

                users_position[message.senderID] = [position[1], position[2]];

                api.sendMessage('OK, now I got you. :)', message.threadID);
            }
        } else {
            if (message.body.match(/news/i)) {
                //news
            } else if (message.body.match(/live/i)) {
                //live info
            } else if (message.body.match(/nearest/i)) {
                //nearest stop
            } else if (message.body.match()) {
                //route
            } else if (message.body.match(/bored/i)) {
                //easter eggs
            }
        }
    });
});
