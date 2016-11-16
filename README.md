# Twitter-ReplyBot
Watch for tweets, and replies to them.

# Deploy

First, go to [the Twitter apps](https://apps.twitter.com/) site and register a new app under the account you want to tweet from (the account that is the bot). After you register a new app, under the "keys and access tokens" tab, you will see a button to generate access tokens. Do so. After you do this, you will have access to all of the below keys/secrets required for the bot to run.

```
$> npm install # or yarn
$> export TWITTER_REPLY_BOT_CONSUMER_KEY="twitter consumer key here"
$> export TWITTER_REPLY_BOT_CONSUMER_SECRET="twitter consumer secret here"
$> export TWITTER_REPLY_BOT_ACCESS_KEY="twitter access token"
$> export TWITTER_REPLY_BOT_ACCESS_SECRET="twitter access secret"
$> export TWITTER_REPLY_BOT_TWEET_STREAM_TRACK="the twitter stream track for tweets to listen for. See info here in README about the track."
$> export NODE_ENV="production" # development = tweet replies don't get sent. production = the bot actually tweets.
$> npm start
```

# Twitter stream track

The Twitter [stream track](https://dev.twitter.com/streaming/overview/request-parameters#track) is a list of phrases that you want Twitter to listen for. For the Twitter stream, when a tweet matches at least 1 of your phrases, you will receive that tweet.

This is how stream tracks (what Twitter uses to watch for tweets) work. It's `phrase,phrase,phrase`. A comma separated list of phrases. A phrase is 1+ words separated by spaces. `suggestions orgs rights` is a phrase. 3 words all separated by spaces. Now, Twitter takes every phrase and forces a tweet to contain *all* of the words in the phrase. This is why you see `women organizations support,lgbt organizations support` for example. We cannot say: `women immigrant lgbt organizations support` unless we want to *only* catch tweets that contain *all* of those 5 words. So, the tracks might seem somewhat redundant, but must be what we use in order to try and catch all tweets about support all the causes.

# Why Twitter stream?

Stream is simply the way that we are using for Twitter to deliver tweets to us. The Twitter search API allows you to read tweets from the past 7 days while the Twitter stream only allows you to listen for tweets into the future starting from when you start the stream. This was chosen because the Twitter search API is nice, but not all tweets are indexed for you. We would not be able to catch every call for help that people are tweeting for! Therefore, this stream exists to capture all of the tweets.

# Contributions

* [Levi Bostian](https://twitter.com/levibostian)
