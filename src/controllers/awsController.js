const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        // this function will upload file to aws and return the link
        let s3 = new aws.S3({ apiVersion: '2006-03-01' }); // we will be using the s3 service of aws
        var uploadParams = {
          ACL: process.env.S3_ALC,
          Bucket: process.env.S3_BUCKET,
          Key: process.env.S3_KEY + file.originalname,
          Body: file.buffer,
        };


        // S3 ManagedUpload with callbacks is not supported in AWS SDK for JavaScript (v3).
        // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
        // S3 ManagedUpload with callbacks is not supported in AWS SDK for JavaScript (v3).
        // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
        s3.upload(uploadParams, function (err, data) {
            if (err) {  
                return reject({ "error": err })
            } 
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })

    });
}


module.exports.uploadFile=uploadFile