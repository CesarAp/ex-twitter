const mongoose = require('mongoose');
const Tweet = require('../models/tweet.model');
const moment = require('moment');

module.exports.index = (req, res, next) => {
    Tweet.find()
        .sort({ createdAt: -1 })
        .then((tweets) => {
            res.render('tweets/index', {
                session: req.session.currentUser,
                tweets: tweets,
                moment: moment
            });
        })
        .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
    const tweet = new Tweet({
        message: req.body.message,
        userId: req.session.currentUser._id,
        username: req.session.currentUser.username
    });
    tweet.save()
        .then(() => {
            res.redirect('/tweets');
        })
        .catch(error => {
            console.error(error);
            if (error instanceof mongoose.Error.ValidationError) {
                res.render('tweets/index', {
                    session: req.session.currentUser,
                    errors: error.errors
                });
            }
        });
}