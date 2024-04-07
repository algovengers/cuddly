import multer from "multer";

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename : function(req,file,cb){
        // const name = Math.floor(Math.random()*100000) + file.filename + Math.floor(Math.random()*100000)
        console.log(file.originalname)
        cb(null,file.originalname)
    }
})

const upload = multer({storage : storage})

export default upload