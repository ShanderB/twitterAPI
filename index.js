/*
 * API Guide  // https://developer.twitter.com/en/docs/api-reference-index
 *
 * get timeline // https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
 * 
 */

//const dataFormater = require('./ownModules/dataFormater'); *no needed anymore
const notifier = require('node-notifier');
const open = require('open');
const { readFile, writeFile } = require('./ownModules/fileHandle');
const user = 'luizavienel'

//Autenticação app

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
const mongoose = require("mongoose");
require("./models/Tweets");
const modelTweets = mongoose.model("modelTweets")
const connectBd = require('./ownModules/mongoose');
const puxarTweet = require('./ownModules/puxarTweet');



connectBd()
setTimeout(() => {
  main()              //!verificar um jeito de fazer isso melhor.
}, 5000);

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



