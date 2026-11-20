const express = require("express");
const { SendMessageCommand } = require("@aws-sdk/client-sqs");
const sqs = require("../config/sqs");

const router = express.Router();

router.post("/send", async (req, res) => {
    try {
        const command = new SendMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            MessageBody: JSON.stringify({
                taskId: "task-001",
                type: "PROCESS_TASK",
                createdAt: new Date().toISOString()
            })
        });

        const result = await sqs.send(command);

        res.json({
            message: "Message sent successfully",
            messageId: result.MessageId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to send message"
        });
    }
});

module.exports = router;