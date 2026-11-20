require("dotenv").config();

const express = require("express");
const fileRoutes = require("./routes/file.routes");


const app = express();

app.use(express.json());

app.use("/files", fileRoutes);

app.get("/health", (req, res) => {
    res.json({
        service: "task-service",
        status: "healthy",
    });
});

const db = require("./config/db");

app.get("/db-health", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");

        res.json({
            database: "connected",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            database: "disconnected"
        });
    }
});

const queueRoutes = require("./routes/queue.routes");

app.use("/queue", queueRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Task service running on port ${PORT}`);
});
