/*
 * API Guide  // https://developer.twitter.com/en/docs/api-reference-index
 *
 * get timeline // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
 * 
 */

//const dataFormater = require('./ownModules/dataFormater'); *no needed anymore
const Twitter = require('twitter');
const notifier = require('node-notifier');
const open = require('open');
const credenc = require('./ownModules/variable.json');
const { readFile, writeFile } = require('./ownModules/fileHandle');
const mongoose = require("mongoose");
const user = 'luizavienel'

//Autenticação app
var client = new Twitter({
  consumer_key: credenc.consumer_key,
  consumer_secret: credenc.consumer_secret,
  access_token_key: credenc.access_token,
  access_token_secret: credenc.access_token_secret,
});
//*Notificar quando possuir um tweet novo
/* 
var paramsLu = { screen_name: user, count: 1, exclude_replies: true, include_rts: false };
setInterval(() => {

  client.get('statuses/user_timeline', paramsLu)
    .then((tweets) => {
      let controlDate = new Date();
      console.log(`Executando: ${controlDate} \n`)

      readFile().then((response) => {
        if (response.toString() !== tweets[0].id_str) {

          writeFile(tweets[0].id_str);
          notifier.notify({ wait: true, title: 'Novo post luiza', message: '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' });

          notifier.on('click', () => { open(`https://twitter.com/luizavienel/status/${tweets[0].id_str}`); });

          setTimeout(() => {
            notifier.removeAllListeners();
          }, 40000);
        }
      }).catch(() => { console.log('creatingFile'); writeFile(tweets[0].id_str); });
    })
    .catch((error) => {
      throw error;
    })
}, 60000)
 */

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
client.get('statuses/user_timeline', { screen_name: user })
  .then((response) => {
    response.forEach((it) => {

      var varID = (it.id_str).toString()
      client.post('statuses/destroy/', { id: varID }).then((response) => {
        console.log(`[${it.id_str}] Success : "${it.text}"`)
      })
        .catch((error) => {
          console.log(`\n=\n==\n====\n=================${error[0]}=================\n====\n===\n==\n=`)
        })
    }).catch((err)=>{console.log(err)})
  })
  .catch((error) => {
    console.log(`\n=\n==\n====\n=================${error[0]}=================\n====\n===\n==\n=`)
  })
 */
/*
*Puxar os tweets
*     @params
*       count: puxa todos os últimos tweets, incluindo respostas
*
*/

//Puxar
/* 
var paramsLu = {screen_name: "ajaxmumakil"};

    client.get('statuses/user_timeline', paramsLu, function (error, tweets, response) {
      if (!error) {
        console.log(Object.keys(tweets));

        tweets.forEach(element => {
          console.log(`"${element.text}"`);
        });
      }
    }); */


//meu 1436006435775713286
//luiza 802246642195922946

//Mongoose 

require("./models/Tweets");
const modelTweets = mongoose.model("modelTweets")

mongoose.connect("mongodb+srv://admin:admin@clustertwitter.6cqd5.mongodb.net/tweetsLuiza?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado Banco");
    client.get('https://api.twitter.com/2/users/802246642195922946/tweets', { max_results: 5, "tweet.fields": "created_at" })

    main()
  })
  .catch((error) => { console.log(error) })


function puxarTweet(token) {
  return new Promise((resolve) => {
    let param = token ? { max_results: 5, pagination_token: token, "tweet.fields": "created_at" } : { max_results: 5, "tweet.fields": "created_at" };

    client.get('https://api.twitter.com/2/users/1436006435775713286/tweets', param)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => { console.log(error); })
  })
}

var dataFromResponse = false
var breakControl = 0
async function main() {
  try {
    while (breakControl != 1) {
      if (Boolean(dataFromResponse) == false) {
        await puxarTweet()
          .then((response) => {
            response.data.forEach((it) => {
              const novoTweet = {
                text: it.text,
                id: it.id,
                created_at: it.created_at,
                insertDB: Date.now() - 3 * 60 * 60 * 1000
              }
              new modelTweets(novoTweet).save().then((res) => {
                console.log(res.insertDB);
              })
              if (response.meta.next_token == undefined) {
                breakControl = 1
              }
              dataFromResponse = response
            })
          })

      } else {
        await puxarTweet(dataFromResponse.meta.next_token)
          .then((response) => {
            if (Boolean(response.meta.next_token) == false) {
              console.log("disconnect")
              // mongoose.disconnect()  //!verificar como fechar a conexão com o banco. Se colocar aqui, ele entra e desconecta o banco, e dá block nas próximas execuções.
              return breakControl = 1
            }
            response.data.forEach((it) => {
              const novoTweet = {
                text: it.text,
                id: it.id,
                created_at: it.created_at,
                insertDB: Date.now() - 3 * 60 * 60 * 1000
              }
              new modelTweets(novoTweet).save().then((res) => {
                console.log(res.insertDB);
              })
              if (response.meta.next_token == undefined) {
                breakControl = 1
              }
            })
            dataFromResponse = response
          })
      }
    }
  } catch (e) {
    console.log(e);
    mongoose.disconnect()
  }
}



