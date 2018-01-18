const User = require('../models/user.model');
const Tweet = require('../models/tweet.model');
const moment = require('moment');

module.exports.show = (req, res, next) => {
    const username = req.params.username;
    User.findOne({ username: req.params.username})
        .then(user => {
            if (!user) {
                next();
            } else {
                Tweet.find({username: user.username})
                    .sort({ createdAt: -1})
                    .then(tweets => {
                        res.render('profile/show', {
                            tweets: tweets,
                            user: user,
                            moment: moment,
                            session: req.session.currentUser,
                            following: req.session.currentUser && 
                                req.session.currentUser.following.some(f => f == user._id)
                        })
                    })
                    .catch(error => next(error));
            }
        })
        .catch(error => next(error));
}

module.exports.follow = (req, res, next) => {
    const username = req.params.username;
    User.findOne({ username: req.params.username })
        .then(follower => {
            if (!follower) {
                next();
            } else {
                const currentUser = req.session.currentUser;
                const criteria = currentUser.following.some(f => f == follower._id) ? 
                    { $pull: { following: follower._id} } :
                    { $addToSet: { following: follower._id } };

                User.findByIdAndUpdate(currentUser._id, criteria, { new: true})
                    .then(currentUser => {
                        req.session.currentUser = currentUser;
                        res.redirect(`/profile/${username}`)
                    })
                    .catch(error => next(error));
            }
        })
        .catch(error => next(error));
}