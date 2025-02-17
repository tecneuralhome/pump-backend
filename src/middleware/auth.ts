import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

let auth = (req: Request, res: Response, next: NextFunction) => {
  let token:any = req.headers['x-access-token'] || req.headers['authorization']; 
  if(token == null) {
    return res.json({
        status: false,
        message: 'Auth token is not supplied'
      }); 
  }
  
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err:any, decoded: any) => {
      if (err) {
        return res.json({
          status: false,
          message: 'Token is not valid'
        });
      } else {
        next();
      }
    });
  } else {
    return res.json({
      status: false,
      message: 'Auth token is not supplied'
    });
  }
};

export default auth