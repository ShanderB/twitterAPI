/*
 * API Guide  // https://developer.twitter.com/en/docs/api-reference-index
 *
 * get timeline // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
 * 
 */

const Twitter = require('twitter');
const credenc = require('./variable.json');
const dataFormater = require('./dataFormater');
require('datejs');
const notifier = require('node-notifier');

//Autenticação app
var client = new Twitter({
  consumer_key: credenc.consumer_key,
  consumer_secret: credenc.consumer_secret,
  access_token_key: credenc.access_token,
  access_token_secret: credenc.access_token_secret,
});

var paramsLu = { screen_name: 'luizavienel', count: 1, exclude_replies: true, include_rts: false };

client.get('statuses/user_timeline', paramsLu)
  .then((tweets) => {

    let controlDate = new Date(); 
    let postDate = new Date(dataFormater(tweets[0])).addHours(-3);//"simple" timeZone :D
    let horaControl = postDate.getHours() - controlDate.getHours();

     if(horaControl <= -1){
      notifier.notify(
        {
          title: 'Novo post luiza',
          message: 'Hello from node, Mr. User!',           //!Verificar se é retweet. Se sim, ignora, ou sei lá.
        },
        function (err, response, metadata) {
          console.log(response)
          // Response is response from notification
          // Metadata contains activationType, activationAt, deliveredAt
        }
      );

      console.log(postDate.getHours())
      console.log(controlDate.getHours())
      console.log(horaControl)
     // console.log(postDate)
     // console.log(controlDate)

    } 

// 
// 
    // console.log("PostH: " + postDate.getHours())
    // console.log("controlH: " + controlDate.getHours())
    // console.log("PostM: " + postDate.getMinutes())
    // console.log("controlM: " + controlDate.getMinutes())
    // console.log("PostS: " + postDate.getSeconds())
    // console.log("controlS: " + controlDate.getSeconds())
    

    // console.log(postDate.getElapsed(controlDate))

  })
  .catch((error) => {
    // console.log(`\n=\n==\n====\n=================${error[0].message}=================\n====\n===\n==\n=`)
    console.log(error)
  })


//*Postar twewt
/*
client.post('statuses/update', {status: 'I L2ov3e Twitter'})
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(`\n=\n==\n====\n=================${error[0].message}=================\n====\n===\n==\n=`)
  })
 */



//*Excluir todos os tweets
/*
var paramsShander = { screen_name: 'ajaxmumakil' };
client.get('statuses/user_timeline', paramsShander)
  .then((response) => {
    response.forEach((it) => {

      var varID = (it.id_str).toString()
      client.post('statuses/destroy/', { id: varID }).then((response) => {
        console.log(`[${it.id_str}] Success : "${it.text}"`)
      })
        .catch((error) => {
          console.log(`\n=\n==\n====\n=================${error[0].message}=================\n====\n===\n==\n=`)
        })
    })
  })
  .catch((error) => {
    console.log(`\n=\n==\n====\n=================${error[0].message}=================\n====\n===\n==\n=`)
  })
 */
/*



*Puxar os tweets
*     @params
*       count: puta todos os últimos tweets, incluindo respostas
*
*/
/* Puxar
var paramsLu = {screen_name: 'luizavienel', count: 10, exclude_replies: true};

    client.get('statuses/user_timeline', paramsLu, function (error, tweets, response) {
      if (!error) {
        console.log(Object.keys(tweets));

        tweets.forEach(element => {
          console.log(`"${element.text}"`);
        });
      }
    }); */