const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, `Tweet can't be empty`]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `Tweet needs an user`]
    },
    username: {
        type: String,
        required: [true, `Tweet needs an username`]
    }
}, { timestamps: true });


const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;