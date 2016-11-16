"use strict";

var Twitter = require('twitter');

var responses = ["if you liked John Oliver's video, check out this shirt for charity https://teespring.com/new-this-is-not-normal", "I love his video! Seen this shirt inspired by it for charity? https://teespring.com/new-this-is-not-normal", "I love this video! Check out this shirt inspired by it for charity. https://teespring.com/new-this-is-not-normal", "John's video is so good. Have you seen this shirt for charity from the video? https://teespring.com/new-this-is-not-normal"];

var consumerKey = process.env.TWITTER_REPLY_BOT_CONSUMER_KEY;
var consumerSecret = process.env.TWITTER_REPLY_BOT_CONSUMER_SECRET;
var accessKey = process.env.TWITTER_REPLY_BOT_ACCESS_KEY;
var accessSecret = process.env.TWITTER_REPLY_BOT_ACCESS_SECRET;

var tweetStreamTrack = process.env.TWITTER_REPLY_BOT_TWEET_STREAM_TRACK;

if (!consumerKey || !consumerSecret || !accessKey || !accessSecret || !tweetStreamTrack) {
    throw new Error("You must set all environmental variables before running.");
}

var client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessKey,
    access_token_secret: accessSecret
});

function sendReplyTweet(tweet, message) {
    var replyTweet = "@" + tweet.user.screen_name + " " + message;
    var reply = { status: replyTweet, in_reply_to_status_id: tweet.id };

    if (process.env.NODE_ENV === "production") {
        client.post('statuses/update', reply, function (error, tweet, response) {});
    } else {
        console.log('info', "sending tweet: " + replyTweet);
    }
}

function assertEventATweet(event) {
    return event.text != null && event.id != null && event.user != null;
}

function getResponse() {
    return responses[Math.floor(Math.random() * responses.length)];
}

client.stream('statuses/filter', { track: tweetStreamTrack, language: 'en' }, function (stream) {
    stream.on('data', function (event) {
        if (assertEventATweet(event)) {
            sendReplyTweet(event, getResponse());
        }
    });

    stream.on('error', function (error) {
        console.log('error', 'ERROR ' + error);
    });
});