import { S3Client, GetObjectCommand, type S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function getClient() {
  const config: S3ClientConfig = { region: process.env.AWS_REGION };
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    };
  }
  return new S3Client(config);
}

const ITEMS_BUCKET = process.env.AWS_S3_ASSETS_BUCKET || "";

export async function getItemImageUrl(key: string) {
  if (!ITEMS_BUCKET) return undefined;
  const client = getClient();
  const command = new GetObjectCommand({ Bucket: ITEMS_BUCKET, Key: key });
  return getSignedUrl(client, command, { expiresIn: 60 * 15 });
}
