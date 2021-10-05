const fs = require('fs');

async function readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('./data/config.txt', function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async function writeFile() {
    return new Promise((resolve, reject) => {
      fs.writeFile('./data/config.txt', function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

module.exports = readFile;