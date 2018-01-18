const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, `Tweet can't be empty`]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, `Tweet needs an user`]
    },
    user_name: {
        type: String,
        required: [true, `Tweet needs an username`]
    }
}, { timestamps: true });


const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;