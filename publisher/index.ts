import express from "express";
import ampqlib from "amqplib";
import keys from "./keys.js";

const app = express();

const queue = "tasks";
const connection = await ampqlib.connect(`amqp://${keys.RABBITMQ_USER}:${keys.RABBITMQ_PASSWORD}@localhost:5672`);

const channel1 = await connection.createChannel();
await channel1.assertQueue(queue);

channel1.sendToQueue(queue, Buffer.from("test message"));
channel1.sendToQueue(queue, Buffer.from("test message2"));

app.listen(5001, () => {
    console.log("Publisher is up and running.");
});