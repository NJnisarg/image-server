const db = require('./db');
const { response } = require('../../lib/response');

const uploadImage = async (req, res, next) => {
    let dbResp = null;
    try {
        dbResp = await db.uploadImage(
        req.body.file, 
        );
        response(
        res,
        dbResp.success,
        dbResp.message,
        dbResp.data,
        dbResp.statusCode
        );
    } catch (err) {
        console.log(err);
        response(
            res,
            false,
            'Error processing the request',
            null,
            500
        );
    }
  };

module.exports = {
    uploadImage
}