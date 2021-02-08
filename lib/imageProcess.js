const sharp = require('sharp');
sharp.cache(false);
const {imgConfig} = require('../config/imgConfig');

const resizeAddWaterMark = async (imgPath,h,w) => {

    let waterMarkImg = `${process.env.NODE_PATH}/config/${imgConfig.waterMarkImg}`;
    console.log(waterMarkImg);

    let buffer = await sharp(imgPath)
    .resize(w, h)
    .composite([{ input: waterMarkImg, gravity: 'southeast' , blend: 'overlay'}])
    .toBuffer();

    return sharp(buffer).toFile(imgPath);
}

module.exports = {
    resizeAddWaterMark
}