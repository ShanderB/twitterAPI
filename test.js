var Twitter = require('twitter');
var credenc = require('./variable.json')


var client = new Twitter({
  consumer_key: credenc.consumer_key,
  consumer_secret: credenc.consumer_secret,
  bearer_token: credenc.bearer_token
});

var params = { screen_name: 'luizavienel', count: 2 };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});