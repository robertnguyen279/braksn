import AWS from 'aws-sdk';

const REGION = 'ap-southeast-1';
const ACCESS_KEY = 'AKIART2HYEJAZ4K7FN6E';
const SECRET_ACCESS_KEY = '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';
export const S3_BUCKET_ASSETS = 'dt3-static-assets';

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

export const myBucket = new AWS.S3({
  region: REGION,
});

export const polly = new AWS.Polly();
