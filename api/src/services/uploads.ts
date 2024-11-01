import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { TeamDB } from "../db/team";

const URL = process.env.BUCKET_URL;
const s3 = new S3({
  forcePathStyle: false,
  endpoint: `https://${URL}`,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.BUCKET_KEY!,
    secretAccessKey: process.env.BUCKET_SECRET!,
  },
});

const LIMITS = {
  free: 2_097_152, // 2GB
};

const isWithinStorageLimit = (currentUsage: number, plan: "free" = "free") => {
  return currentUsage <= LIMITS[plan];
};

export const uploadFile = async (
  file: Express.Multer.File,
  fileType: string,
  teamId: string
): Promise<string> => {
  try {
    const fileName = `${randomUUID().slice(4)}-${file.originalname}`;
    // S3 upload parameters
    const params = {
      Bucket: URL,
      Key: `${fileType}/${fileName}`,
      Body: file.buffer,
      ContentType: fileType,
      ACL: "public-read" as any,
    };

    const team = await TeamDB.findOne({ _id: teamId });

    if (!team) {
      throw new Error("No team found");
    }

    team.usedStorage += file.size;

    if (!isWithinStorageLimit(team.usedStorage)) {
      throw new Error("Not enough space");
    }
    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3.send(command);

    await team.save();

    return `https://${URL}/${URL}/${fileType}/${fileName}`;
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Error uploading file");
  }
};
