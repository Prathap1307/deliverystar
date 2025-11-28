import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { s3Client } from "./client";

export async function uploadItemImage(file: File | Buffer, contentType?: string) {
  const body = file instanceof Buffer ? file : Buffer.from(await file.arrayBuffer());
  const key = `${randomUUID()}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
}
