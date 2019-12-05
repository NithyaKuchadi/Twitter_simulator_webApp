var connection = new require('./kafka/Connection');

//topics file

var listTopics = require('./services/listTopics.js.js.js');
var userTopics = require('./services/userTopics.js.js.js');

function handleTopicRequest(topic_name, fname) {
    console.log("topic_name:", topic_name)
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    consumer.on('error', function (err) {
        console.log("Kafka Error: Consumer - " + err);
    });
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        switch (topic_name) {

            case 'profileTopics':
                listTopics.listTopicsService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'userTopics':
                userTopics.userTopics(data.data, function (err, res) {
                        response(data, res, producer);
                        return;
                    });
                    break;
        
            
        }
    })
};

function response(data, res, producer) {
    console.log('after handle', res);
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        console.log('producer send', data);
    });
    return;
}

handleTopicRequest("listTopics", listTopics);
handleTopicRequest("userTopics", userTopics);
