var Botkit = require('botkit');
var db = require("./controllers/db");


var controller = Botkit.facebookbot({
        access_token: process.env.access_token,
        verify_token: process.env.verify_token,
})

var bot = controller.spawn({
});

// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
controller.setupWebserver(9000,function(err,webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function() {
      console.log('This bot is online!!!');
  });
});

// this is triggered when a user clicks the send-to-messenger plugin
controller.on('facebook_optin', function(bot, message) {

    bot.reply(message, 'Welcome to my app!');

});

// user said hello
// controller.on('message_received', function(bot, message) {
// 	console.log("Hit !!!")
//     bot.reply(message, 'Hey there.');

// });

controller.hears(['.*'], 'message_received', function(bot, message) {
	console.log("Reached!!")
	if(!message.is_echo){
		bot.startConversation(message, function(err, convo) {
		var user = message.user;
		db.findDocument({user : user},function (data) {
			// console.log(data);
			if(data){
				bot.reply(message,'hello ' + data["username"] + " whats up!");
			}
			else{
				convo.ask('i would like to ask your name for future refrence?', function(response, convo) {
            	bot.reply(message,'cool ' + response.text + ' i Got it');
            	console.log("hello",convo);
				db.insertDocument({user : user,username : response.text },function(){
					console.log("Inserted !!");
				})
        });
			}
		})

		
	})
    
}
});

// access token
// EAABzdgfLfQsBANfaPJrrmLsAku0AVO3yvNxomxbP9JECrFj03GoQwPerdYUOU2qhqlCpJkTAafpUNQQvxtZBxucBjlIIjgaRQpV5pMnUu6fpoFR7pgms7wurjxpHZCwGah2EHzSFGf5wS0XkZCV4VtgSSHZADttZAnzZB4TbM1WgZDZD

//EAABzdgfLfQsBABCZAfECJDEIJCJr88pEoFVg8fCqsyHb1uEmAyZCPWqSUlZCrMSZCfyfjR7qbwDCo6Pc0XzAqEyoqPdoOo7dGQJC2FZAB8u1GsdXVbwZCYy2AI4BZAQ9jI7pMBbxh5DMjJEtjZAglUTQt1aKqzPP65GZCzdIQJdrAjQZDZD
// msccs35

// 
// page_token=EAABzdgfLfQsBANfaPJrrmLsAku0AVO3yvNxomxbP9JECrFj03GoQwPerdYUOU2qhqlCpJkTAafpUNQQvxtZBxucBjlIIjgaRQpV5pMnUu6fpoFR7pgms7wurjxpHZCwGah2EHzSFGf5wS0XkZCV4VtgSSHZADttZAnzZB4TbM1WgZDZD verify_token=msccs35 node facebook_bot.js --lt
