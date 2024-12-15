import aws from "aws-sdk";
import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION } from "./serverConfig.js";

export const s3 = new aws.S3({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});
