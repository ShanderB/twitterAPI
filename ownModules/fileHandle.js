const fs = require('fs');

async function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/config.txt', function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function writeFile(dados) {
  return new Promise((resolve, reject) => {
    fs.writeFile('./data/config.txt', dados, function (err) {
      if (err) reject(err);
      resolve(dados);
    });
  });
}

module.exports = { readFile, writeFile };