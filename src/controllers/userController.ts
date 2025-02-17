import { Request, Response } from "express";
import {commonModel} from "./../models/commonModel"
import { validationResult } from "express-validator";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";
import bs58 from "bs58";
import * as anchor from "@coral-xyz/anchor";
import jwt from "jsonwebtoken";

const get_sign_message = (req: Request, res: Response) => {
    const response: commonModel = {
        status: true,
        message: "sign message successfully retrieved",
        data: process.env.SIGN_MESSAGE || "",
        errors: null
    }
    res.status(201).json(response);
}

const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    let response:commonModel;
    if (!errors.isEmpty()) {
        response = {
            status: false,
            message: "user login validation failed",
            data: "",
            errors: errors.array()
        }
    }

    const messageBytes = decodeUTF8(process.env.SIGN_MESSAGE || "");
    const signature = bs58.decode(req.body.signature);
    const wallet = new anchor.web3.PublicKey(req.body.wallet);
    const result = nacl.sign.detached.verify(
        messageBytes,
        signature,
        wallet.toBytes(),
    );
    if(result) {
        let token = jwt.sign({wallet:req.body.wallet},
            process.env.JWT_SECRET_KEY || "", { expiresIn: '1h' }
        );
        response = {
            status: true,
            message: "user login successfully",
            data: token,
            errors: null
        }
    } else {
        response = {
            status: false,
            message: "siganture verification failed",
            data: "",
            errors: null
        }
    }

    res.status(201).json(response);
}

export default {
    get_sign_message,
    login
}