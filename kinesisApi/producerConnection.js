var AWS = require('aws-sdk');

function newKinesisConnection(AWS) {
    return function(region) {
        return new AWS.Kinesis({region: region});
    };
}

function newStream(kinesis, checkStreamState) {
    return function(streamName, NumberOfShards, outputCallback) {
        kinesis.createStream(
            {ShardCount: NumberOfShards, StreamName: streamName},
            function(error, data) {
                if (error && error.code !== 'ResourceInUseException') {
                    outputCallback(error);
                    return;
                }
                checkStreamState(streamName, outputCallback);
            });
    };
}

function checkStreamState(kinesis) {
     var checkStream = function(streamName, outputCallback) {
         kinesis.describeStream(
             {StreamName: streamName},
             function(error, data) {
                 if (error) {
                    outputCallback(error);
                    return;
                 }
                 
                 if (data.StreamDescription.StreamStatus === 'ACTIVE') {
                     
                     outputCallback(null, kinesis);
                 } else {
                     //retry after 5 secs
                     setTimeout(
                         function(){
                             checkStream(streamName, outputCallback);
                         },
                         5000);
                 }
                 
             });
     };
     return checkStream; 
}


exports.provider = function(connDetails) {
    var getClient = newKinesisConnection(AWS),
        client    = getClient(connDetails.region),
        checkStream = checkStreamState(client),
        getStream = newStream(client,checkStream);
        
        return getStream;
}