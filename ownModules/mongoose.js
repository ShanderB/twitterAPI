const mongoose = require("mongoose");

function connectBd() {
    mongoose.connect("mongodb://admin:admin@localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
console.log("CONECTED")
        })
        .catch((error) => {
            mongoose.disconnect();
            console.log(error)
        })
}

module.exports = connectBd;
