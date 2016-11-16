/* @flow */

var Twitter = require('twitter')

const responses = ["if you liked John Oliver's video, check out this shirt for charity https://teespring.com/new-this-is-not-normal", "I love John Oliver's video! Seen this shirt inspired by it for charity? https://teespring.com/new-this-is-not-normal"]

const consumerKey: ?string = process.env.TWITTER_REPLY_BOT_CONSUMER_KEY
const consumerSecret: ?string = process.env.TWITTER_REPLY_BOT_CONSUMER_SECRET
const accessKey: ?string = process.env.TWITTER_REPLY_BOT_ACCESS_KEY
const accessSecret: ?string = process.env.TWITTER_REPLY_BOT_ACCESS_SECRET

const tweetStreamTrack: ?string = process.env.TWITTER_REPLY_BOT_TWEET_STREAM_TRACK

if (!consumerKey || !consumerSecret || !accessKey || !accessSecret || !tweetStreamTrack) { throw new Error("You must set all environmental variables before running.") }

var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessKey,
  access_token_secret: accessSecret
})

function sendReplyTweet(tweet: Object, message: string) {
    if (tweet.user.screen_name == "levibostian") {
        return;
    }

    var replyTweet: string = "@" + tweet.user.screen_name + " " + message;
    var reply: Object = {status: replyTweet, in_reply_to_status_id: tweet.id_str};

    if (process.env.NODE_ENV === "production") {
        client.post('statuses/update', reply,  function(error, tweet, response) {
        })
    } else {
        console.log('info', "sending tweet: " + replyTweet);
    }
}

function assertEventATweet(event: Object): boolean {
    return event.text != null && event.id != null && event.user != null
}

function getResponse(): string {
    return responses[Math.floor(Math.random() * responses.length)]
}

client.stream('statuses/filter', {track: tweetStreamTrack, language: 'en'}, function(stream) {
    stream.on('data', function(event) {
        if (assertEventATweet(event)) {
            sendReplyTweet(event, getResponse())
        }
    })

    stream.on('error', function(error) {
        console.log('error', 'ERROR ' + error)
    })
})
