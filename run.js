var login = require('facebook-chat-api');
var rnv_api = require('rnv_api.js');

var users_position = new Array();
var rnv = new rnv_api();

login({email: '', password: ''}, function callback (err, api) {
    if(err)
        return console.error(err);

    api.listen(function callback(err, message) {
        if (message.attachments[0]) {
            type = message.attachments[0].type;
            if (type == 'sticker') {
                transportation_stickers = ['665073523504168', '210852145739487', '209575122566323', '210852145739487', '567099163388580'];
                msg = {sticker: transportation_stickers[Math.floor(Math.random() * transportation_stickers.length)]};

                api.sendMessage(msg, message.threadID);
            } else if (type == 'share') {
                position_url = message.attachments[0].facebookUrl;

                pattern = /where1=(.*)%2C\+(.*)&FORM/;
                position = pattern.exec(position_url);

                users_position[message.senderID] = [position[1], position[2]];

                api.sendMessage('OK, now I got you. :)', message.threadID);
            } else {
                api.sendMessage('I don\'t want to be straight, but... you look so sorry. :P', message.threadID);
            }
        } else {
            if (message.body.match(/news/i)) {
                news = rnv.get_news();

            } else if (message.body.match(/live/i)) {
                live_infos = rnv.get_live_infos();

            } else if (message.body.match(/nearest/i)) {
                if (users_position[message.senderID]) {
                    nearest_stop = rnv.get_the_nearest_stop(users_position[message.senderID]);

                } else {
                    api.sendMessage('Sorry, but did you share your location with me?', message.threadID);
                }
            } else if (message.body.match()) {
                if (users_position[message.senderID]) {
                    route = rnv.get_route(users_position[message.senderID], destination);

                } else {
                    api.sendMessage('Sorry, but did you share your location with me?', message.threadID);
                }
            } else if (message.body.match(/bored/i)) {
                api.sendMessage('I am wondering if you know that they already made a game of me. ;)\nhttp://kindersung.github.io/flappy/', message.threadID);
            }
        }
    });
});
