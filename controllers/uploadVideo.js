const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadVideo = {
    uploadVideo: (req, res) => {
        try {
            const file2 = req.files.file;
            
            cloudinary.v2.uploader.upload_large(file2.tempFilePath, {folder: 'video',
             resource_type : "video", crop: "fill"},
            async(err, result) => {
                if(err) throw err;

                removeTmp(file2.tempFilePath)

                res.json({url: result.secure_url})
            })
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    })
}

module.exports = uploadVideo