const { response } = require('./response');
const formidable = require('formidable');

const imageReqProcess = async (req,res,next) => {
    const form = formidable({ multiples: true, maxFileSize: 20 * 1024 * 1024});
    form.parse(req, (err, fields, files) => {
        if(err)
        {
            console.log("Error in processing image request:",err);
            response(res, false, "Error in processing image request", null, 400);
        }
        else{
            if(files.img === undefined || files.img===null)
            {
                response(res, false, "Please use the key as img", null, 400);
            }
            else{
                req.body.file = files.img;
                next();
            }
                

        }
    });
}

module.exports = {
    imageReqProcess
}