# node-rabbitmq

To start up the RabbitMQ:
```
docker build -t node/rabbitmq .
docker run -p 15672:15672 -p 5672:5672 node/rabbitmq
```
To start up both publisher and consumer:
```
npm start
```
