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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Task service running on port ${PORT}`);
});
