
function writeData(kinesis, streamName) {
    return function(data) {
        console.log('some text: ',data.text);
        
        kinesis.putRecord(
            {
                Data: JSON.stringify(data),
                PartitionKey: 'pk-1', //todo workout what to set this as
                StreamName: streamName
            },
            function(error, data) {
                if (error) {
                    console.log(error);
                }
            });
    };
}

exports.writeToStream = function(kinesis, streamName) {
    
    return writeData(kinesis,streamName);
}