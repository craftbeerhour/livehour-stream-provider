var Twitter = require('twitter');
var streamConnection = require('./twitterApi/streamConnection.js');
var keyword = '#craftbeerhour';
var connectionDetails = {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_SECRET
    };

var newStream = streamConnection.stream(connectionDetails);

newStream(keyword);


