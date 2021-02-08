const fs = require('fs');
const aws = require('aws-sdk');
const { awsConfig } = require('../../config/awsConfig');
const { imgConfig } = require('../../config/imgConfig');
const { resizeAddWaterMark } = require('../../lib/imageProcess');

const uploadImage = async (image) => {
    return new Promise(async (resolve, reject) => {
    
        const dbResp = {
            success: false,
            message: null,
            data: null,
        };
        aws.config.update({
            region: awsConfig.region,
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey
        });
        let ts = Date.now();
        const params = {
            Bucket: imgConfig.bucket,
            Key: `image-${ts}`,
            Body: image,
            ContentType: image.type,
            ACL: 'public-read'
        };

        let done = await resizeAddWaterMark(image.path, imgConfig.resizeDim.h, imgConfig.resizeDim.w);
        if(done)
        {
            params.Body = fs.createReadStream(image.path);
        

            let upload = new aws.S3.ManagedUpload({
                params
            });

            let promise = upload.promise();
            promise.then((data) => {
                console.log("Image Upload Success from DB:", data);
                dbResp.success = true;
                dbResp.message = "Successfully uploaded image";
                dbResp.data = {
                    uploadedUrl: data.Location
                };
                resolve(dbResp);
            },(err) =>  {
                console.log("Image Upload Err from DB:", err);
                dbResp.success = false;
                dbResp.message = "There was an error uploading image";
                dbResp.data = null;
                resolve(dbResp);
            });
        }
        else{
            dbResp.success = false;
            dbResp.message = "Error in processing the image";
            dbResp.data = null;
            resolve(dbResp);
        }
    });
}

module.exports = {
    uploadImage
}