import { NextFunction, Request, Response } from "express";


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

    const {rol} = req.body.userAuth;

    if (rol !== "S0y4dmin") {
        res.status(401).json({
            msg: "El usuario no es administrador"
        })
        return
    }

    next()
}