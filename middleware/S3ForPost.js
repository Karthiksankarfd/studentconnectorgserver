require("dotenv").config()

const { S3Client } = require('@aws-sdk/client-s3')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')


const bucket = process.env.S3_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION

const s3 = new S3Client({
   accessKeyId,
   secretKey,
   region
}) 

    const uploadPostFields = multer({
        storage: multerS3({
          s3: s3,
          bucket: bucket,
          metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
          },
          key: function (req, file, cb) {
            const uniqueKey = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueKey)
          }
        })
      })




module.exports = uploadPostFields