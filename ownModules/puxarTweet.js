const client = require("./buildAuth")

function puxarTweet(token) {
  return new Promise((resolve, reject) => {
    const param = token ? { max_results: 5, pagination_token: token, "tweet.fields": "created_at" } : { max_results: 5, "tweet.fields": "created_at" };

    client.get('https://api.twitter.com/2/users/1436006435775713286/tweets', param)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error);
      })
  })
}

module.exports = puxarTweet;
