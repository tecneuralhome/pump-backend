import express from "express";
import multer from "multer"
import uploadController from "../controllers/uploadController";
let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+"_"+file.originalname)
    }
})
const upload = multer({ storage: storage })

router.post('/image',upload.single('file'),uploadController.upload)
export default router