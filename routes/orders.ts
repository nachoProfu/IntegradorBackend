import { Router } from "express";
import { createOrder, getOrder } from "../controllers/orders";
import validarJWT from "../middlewares/validarJWT";
import {check} from 'express-validator';
import { recolectarErrores } from "../middlewares/recolectarErrores";



const router = Router();


router.post("/",
    [
        validarJWT,
        check("shipment","Los detalles de envio son obligatorios").not().isEmpty(),
        check("items","Listado de items es obligatoria").not().isEmpty(),
        recolectarErrores
    ]
    ,createOrder);


router.get("/",
[
    validarJWT
]
,getOrder);

export default router;
