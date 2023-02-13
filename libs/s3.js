const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const fs = require('fs')

const S3 = require('aws-sdk/clients/s3')// TEMPORAL

require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

const s3 = new S3({ //TEMPORAL
  region,
  accessKeyId,
  secretAccessKey
})


const uploadFile = (fileBuffer, fileName, mimetype) => {
  // const fileStream = fs.createReadStream(fileBuffer.path)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype
  }

  return s3Client.send(new PutObjectCommand(uploadParams));
}

const deleteFile = (fileName) => {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

const getObjectSignedUrl = async (key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key
    } 
    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    // const seconds = 60
    // const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
    const url = await getSignedUrl(s3Client, command); // SIN EXPIRACION
    return url
  } catch (error) {
    throw new Error(error)
  }
}

const getFileStream = async (fileKey) => {
    try {
        const downloadParams = {
            Key: fileKey,
            Bucket: bucketName
        }
        
        return s3.getObject(downloadParams).createReadStream()
        
    }  catch (error) {
        throw new Error(error)
    }
    
}


module.exports = {
  uploadFile,
  getObjectSignedUrl,
  deleteFile,
  getFileStream
}



// require('dotenv').config()
// const fs = require('fs')
// const S3 = require('aws-sdk/clients/s3')

// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// const s3 = new S3({
//   region,
//   accessKeyId,
//   secretAccessKey
// })

// // Uploads a file to s3
// //  Pass file from multer (req.file)
// //      req.file is an obj which has props (path...) 
// //  And then we make an obj with props to upload it to s3

// //This function return a promise, so we can use then or await

// function uploadFile(file, keyName) {
//   const fileStream = fs.createReadStream(file.path)

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileStream,
//     Key: keyName
//   }

//   return s3.upload(uploadParams).promise()
// }

// // downloads a file from s3
// //  We pass the key of the image
// //  S3 will search for that key in the bucket
// //  Then return a readStream

// const getFileStream = async (fileKey) => {
//     try {
//         const downloadParams = {
//             Key: fileKey,
//             Bucket: bucketName
//         }
        
//         return s3.getObject(downloadParams).createReadStream()
        
//     }  catch (error) {
//         throw new Error(error)
//     }
    
// }

// function deleteFile(fileKey) {
//     const deleteParams = {
//         Bucket: bucketName,
//         Key: fileKey,
//     }

//     return s3.deleteObject(deleteParams).promise()
// }

// module.exports = {
//     uploadFile,
//     getFileStream,
//     deleteFile
// }