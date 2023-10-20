import { Router } from "express";
import { createProduct, getProductById, getProducts } from "../controllers/products";
import validarJWT from "../middlewares/validarJWT";
import { isAdmin } from "../middlewares/validarRol";
import {check} from 'express-validator';
import { recolectarErrores } from "../middlewares/recolectarErrores";

const router = Router();



router.get("/",getProducts);

router.get("/:id",getProductById);


router.post("/",
    [
        validarJWT,
        isAdmin,
        check("id","El id es obligatorio").not().isEmpty(),
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("precio","El precio es obligatorio").not().isEmpty(),
        check("categoria","La categoria es obligatoria").not().isEmpty(),
        check("cardImg","La imagen es obligatoria").not().isEmpty(),
        recolectarErrores
    ]
    ,createProduct);



export default router;
