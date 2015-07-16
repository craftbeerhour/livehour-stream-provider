var   Twitter = require('twitter'),
      streamConnection = require('./twitterApi/streamConnection.js'),
      sendData = require("./kinesisApi/sendData.js"),
      producerConnection = require("./kinesisApi/producerConnection.js"),
      keyword = '#craftbeerhour',
      connectionDetails = {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET
      },
      newStream = streamConnection.stream(connectionDetails),
      getKinesisStream = producerConnection.provider({region: 'some-region'})



getKinesisStream('testStream', 1, function(error, stream){
      if (error) {
            console.log(error);
            return;
      }
      newStream(keyword, sendData.writeToStream(stream, 'testStream'));
})



