const Twitter = require('twitter');
const credenc = require('../ownModules/variable.json');


var client = new Twitter({
    consumer_key: credenc.consumer_key,
    consumer_secret: credenc.consumer_secret,
    access_token_key: credenc.access_token,
    access_token_secret: credenc.access_token_secret,
  });

module.exports = client;
