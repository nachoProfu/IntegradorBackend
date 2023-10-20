import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user";


const validarJWT = async ( req:Request, res:Response, next:NextFunction) =>{

    const token =req.headers["x-token"] as string

    if(!token){
        res.status(401).json({msg:"No hay token en la peticion"});
        return;
    }

    try {
       const claveSecreta = process.env.CLAVESECRETA as string;
       const payload = jwt.verify(token,claveSecreta) as JwtPayload;

       const {id} = payload;

       const userAuth:IUser | null = await User.findById(id);

        if(!userAuth){
            res.status(404).json({msg:"El usuario no existe en Base de Datos"});
            return;
        }

        req.body.userAuth = userAuth;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({msg:"Token no valido"});
    }
}



export default validarJWT;
