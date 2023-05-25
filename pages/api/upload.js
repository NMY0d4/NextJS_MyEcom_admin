import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getRandomNumber } from '@/lib/utils';
import mime from 'mime-types';
import fs from 'fs';

export default async function handle(req, res) {
  const form = new multiparty.Form();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    console.log('length:', files.file.length);

    const client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
    const bucketName = 'nextjs-gmweb-ecommerce';
    const links = [];
    for (const file of files.file) {
      const ext = file.originalFilename.split('.').pop();
      const newFilename = `${Date.now()}/${getRandomNumber()}.${ext}`;
      console.log({ ext, file });
      await client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newFilename,
          Body: fs.readFileSync(file.path),
          ACL: 'public-read',
          ContentType: mime.lookup(file.path),
        })
      );

      const link = `https://${bucketName}.S3.amazonaws.com/${newFilename}`;
      links.push(link);
    }

    res.json({ links });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: { bodyParser: false },
};