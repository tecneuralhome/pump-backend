import express from "express";
import { check } from "express-validator";
import userController from "../controllers/userController"
let router = express.Router();

router.get('/message',userController.get_sign_message)
router.post('/login',[check('wallet').not().isEmpty(),check('signature').not().isEmpty()],userController.login)

export default router