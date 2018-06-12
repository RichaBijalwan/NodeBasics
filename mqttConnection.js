var mqtt = require('mqtt');
var mqttClient = mqtt.connect('mqtt://localhost:1883'); //TODO change the host name where to set

mqttClient.on('connect', () => {  
  console.log('connected');
  mqttClient.subscribe('hello');
  mqttClient.subscribe('status');
});

mqttClient.on('message', (topic, message) => {  
  switch(topic) {
    case 'status' : 
      console.log(`Received status: '${message}'`);
      break;
    case 'hello' : 
      console.log(`Received hello: '${message}'`)
      break;
  }
});

function askStatus() {
  mqttClient.publish('giveStatus', 'update', { qos: 2 });
}