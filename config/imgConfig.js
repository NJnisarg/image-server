const imgConfig = {
    bucket: process.env.AWS_S3_BUCKET,
    resizeDim: {
        h: 100,
        w: 100
    },
    waterMarkImg: 'copyright_watermark.jpg'
}

module.exports = {
    imgConfig
}