const mongoose = require("mongoose");
const puxarTweet = require('./puxarTweet');
const formatarDados = require('../models/jsonInsertModel');
require("../models/mongoose/Tweets");
const modelTweets = mongoose.model("modelTweets")

var dataFromResponse = false
var breakControl = 0
async function main() {
  try {
    while (breakControl != 1) {

      if (Boolean(dataFromResponse) == false) {

        await puxarTweet()
          .then((response) => {

            response.data.forEach((it) => {

              new modelTweets(formatarDados(it)).save().then((res) => {
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

              new modelTweets(formatarDados(it)).save().then((res) => {
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

module.exports = main;
