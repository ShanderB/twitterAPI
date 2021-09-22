/*
 * API Guide  // https://developer.twitter.com/en/docs/api-reference-index
 *
 * get timeline // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
 * 
 */

var Twitter = require('twitter');
var credenc = require('./variable.json')

var client = new Twitter({
  consumer_key: credenc.consumer_key,
  consumer_secret: credenc.consumer_secret,
  bearer_token: credenc.bearer_token
});

var params = {screen_name: 'luizavienel', count: 10, exclude_replies: true};

client.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(Object.keys(tweets));

    tweets.forEach(element => {
      console.log(`"${element.text}"`);
    });
  }
});