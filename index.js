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
const credenc = require('../ownModules/variable.json');

//Autenticação app

//*Notificar quando possuir um tweet novo
/* 
var paramsLu = { screen_name: credenc.otherUser, count: 1, exclude_replies: true, include_rts: false };
setInterval(() => {

  client.get('statuses/user_timeline', paramsLu)
    .then((tweets) => {
      let controlDate = new Date();
      console.log(`Executando: ${controlDate} \n`)

      readFile().then((response) => {
        if (response.toString() !== tweets[0].id_str) {

          writeFile(tweets[0].id_str);
          notifier.notify({ wait: true, title: 'Novo post', message: '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' });

          notifier.on('click', () => { open(`https://twitter.com/credenc.otherUserString/status/${tweets[0].id_str}`); });

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
client.get('statuses/user_timeline', { screen_name: credenc.myUserString })
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
var paramsLu = {screen_name: credenc.otherUserString};
const client = require("./ownModules/buildAuth")

    client.get('statuses/user_timeline', paramsLu, function (error, tweets, response) {
      if (!error) {
        console.log(Object.keys(tweets));

        tweets.forEach(element => {
          console.log(element);
        });
      }
    });  */

//Mongoose 

const connectBd = require('./ownModules/mongoose');
const main = require('./ownModules/main');

//todo dar um jeito de fechar a conexão.

connectBd()
setTimeout(() => {
  main()              //!verificar um jeito de fazer isso melhor.
}, 3000);





