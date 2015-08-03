var   Twitter = require('twitter'),
      streamConnection = require('./twitterApi/streamConnection.js'),
      keyword = '#craftbeerhour',
      connectionDetails = {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET
      },
      newStream = streamConnection.stream(connectionDetails),
      firebaseProvider = require("./firebaseApi/providerConnection.js"),
      newFirebaseConnection = firebaseProvider.connection(process.env.FIREBASE_APP_URL);
      
      newStream(keyword, function(tweet){
            var tweetRepository = newFirebaseConnection.child('tweets');
            tweetRepository.push(tweet);
      });







