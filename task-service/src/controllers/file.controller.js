const { randomUUID } = require("crypto");

const {
    PutObjectCommand,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require("../config/s3");

const generateUploadUrl = async (req, res) => {
    try {
        const key = `uploads/${randomUUID()}`;

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            ContentType: "application/octet-stream"
        });

        const uploadUrl = await getSignedUrl(s3, command, {
            expiresIn: 300
        });

        res.json({ uploadUrl, key });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate upload URL" });
    }
};

const generateDownloadUrl = async (req, res) => {
    try {
        if (!req.query.key) {
            return res.status(400).json({
                message: "File key is required"
            });
        }
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: req.query.key
        });

        const downloadUrl = await getSignedUrl(s3, command, {
            expiresIn: 300
        });

        res.json({ downloadUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate download URL" });
    }
};

module.exports = {
    generateUploadUrl,
    generateDownloadUrl
};