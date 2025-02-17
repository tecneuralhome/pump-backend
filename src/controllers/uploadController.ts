import { Request, Response } from "express";
import {commonModel} from "./../models/commonModel"

const upload = (req: Request, res: Response) => {
    console.log(req.body)
    const response: commonModel = {
        status: true,
        message: "image uploaded successfully",
        data:req.file?.filename,
        errors: null
    }
    res.status(201).json(response);
}

export default {
    upload
}