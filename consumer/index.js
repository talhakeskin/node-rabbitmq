import express from "express";
import amqplib from "amqplib";
import keys from "./keys.js";
const app = express();
const queue = "tasks";
const connection = await amqplib.connect(`amqp://${keys.RABBITMQ_USER}:${keys.RABBITMQ_PASSWORD}@localhost:5672`);
const channel1 = await connection.createChannel();
await channel1.assertQueue(queue);
await channel1.consume(queue, (message) => {
    if (message == null) {
        console.log("Consumer cancelled by server.");
        return;
    }
    console.log("Message: ", message.content.toString());
    channel1.ack(message);
});
app.listen(5000, () => {
    console.log("Consumer is up and running.");
});
