const express = require('express');
const routing = express.Router();
const {imageReqProcess} = require('../../lib/imageReq');
const controllers = require('./controllers');

routing.post(
  '/uploadImage',
  imageReqProcess,
  controllers.uploadImage
);

module.exports = routing