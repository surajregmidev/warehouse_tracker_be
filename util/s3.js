const AWS = require("aws-sdk");
const fs = require("fs");
const { v4 } = require("uuid");
require("dotenv").config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKETNAME;
const accessKeyId = process.env.AWS_ACCESSKEYID;
const secretAccessKey = process.env.AWS_SECRETACCESSKEY;

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  signatureVersion: "v4",
});

async function uploadFile(file, folder, loggedInUserId) {
  console.log("file to upload");
  console.log(file);
  const imageName =
    loggedInUserId +
    "-" +
    file.fieldname +
    "-" +
    Date.now() +
    "." +
    file.originalname.split(".")[1];

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKETNAME,
    Body: fileStream,
    Key: folder + "/" + imageName,
  };

  return s3.upload(uploadParams).promise();
}

module.exports = { uploadFile };
