const express = require("express");
const router = express.Router();

const utilController = require('./util.controller')

 router.post('/fileupload',utilController.fileUpload) 


module.exports=router