const mongoose = require("mongoose");

function connectBd() {
    mongoose.connect("mongodb+srv://admin:admin@clustertwitter.6cqd5.mongodb.net/tweetsLuiza?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
console.log("CONECTED")
        })
        .catch((error) => {
            mongoose.disconnect();
            console.log(error)
        })
}

module.exports = connectBd;
