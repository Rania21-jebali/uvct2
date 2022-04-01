const multer = require('multer')
const router= require('express').Router()
const path = require('path')

//Storage
const storage= multer.diskStorage({
    destination:(req,file, cb) =>{
      cb(null,'./avatar')
    },
    filename:(req,file,cb) =>{
      const fileName=`${Date.now()}_${file.originalname}`;
      cb(null,fileName);
    }
  });
  const upload=multer({storage:storage}).single('avatar');
 

  router.post('/uploads',upload, (res,req) =>{
      const {file} =req;
      res.send({
         file: file.originalname,
         path: file.path
      })
  })

  module.exports= upload