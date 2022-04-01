const multer = require('multer')
const router= require('express').Router()
const path = require('path')

//Storage
const storageCV= multer.diskStorage({
    destination:(req,file, cb) =>{
      cb(null,'./CVs')
    },
    filename:(req,file,cb) =>{
      const fileName=`${Date.now()}_${file.originalname}`;
      cb(null,fileName);
    }
  });
  const uploadCV=multer({storage:storageCV}).single('cv');
  

  module.exports= uploadCV