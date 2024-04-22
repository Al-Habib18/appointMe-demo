/** @format */

import amqp from "amqplib";

const receiveFromQueue = async () => {
    try {
        const connection = await amqp.connect(
            "amqp://guest:guest@172.17.0.1:5672"
        );
        const channel = await connection.createChannel();

        // const exchange = "login_exchange";
        const queue = "login_queue";
        // const routingKey = queue;

        // Assert the queue exists (remove exchange assertion if not used)
        await channel.assertQueue(queue, { durable: true });

        // Bind the queue directly if not using an exchange
        // await channel.bindQueue(queue, exchange, routingKey);

        channel.consume(
            queue,
            async (msg) => {
                if (!msg) return;
                const login_history = JSON.parse(msg.content.toString());
                console.log(
                    "login history created successfully:",
                    login_history
                );

                // Acknowledge the message after processing
                channel.ack(msg);
            },
            { noAck: false } // Enable automatic acknowledgement
        );

        console.log("Receiver listening for messages...");
    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
    }
};

receiveFromQueue();
