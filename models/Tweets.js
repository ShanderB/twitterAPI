const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweets = new Schema({
    text: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: "2000-01-01T00:00:00"
    },
    insertDB: {
        type: Date,
        default: Date.now()
    },
},{ collection : 'question' })

mongoose.model("modelTweets", tweets);