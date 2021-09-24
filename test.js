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
  access_token_key: credenc.access_token,
  access_token_secret: credenc.access_token_secret,
});

/* 
var params = {screen_name: 'luizavienel', count: 10, exclude_replies: true};

client.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(Object.keys(tweets));

    tweets.forEach(element => {
      console.log(`"${element.text}"`);
    });
  }
}); */

/* 
client.post('statuses/update', {status: 'I L2ov3e Twitter'})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(`\n=\n==\n====\n=================${error[0].message}=================\n====\n===\n==\n=`)
  })
 */



  var id = 1441182358049202188

client.post('statuses/destroy/1441182358049202188', {id: id}).then((response) => {  //! Verificar como enviar a requisição. Chumbando o valor, passa normal
  console.log(response)
}).catch((error) => {
  console.log(error)
  // console.log(`\n=\n==\n====\n=================${error[0].message}=================\n====\n===\n==\n=`)
})


