import { Router } from "express";
import { createUser, deleteUser, getUsers, login } from "../controllers/users";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import validarJWT from "../middlewares/validarJWT";
import { isAdmin } from "../middlewares/validarRol";


const router = Router();


router.get("/",getUsers);


router.post("/register",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("email","El email es obligatorio").isEmail(),
        check("password","El password debe ser minimo 6 caracteres").isLength({min: 6}),
        recolectarErrores
    ]
,createUser);

router.post("/login",
    [
        check("email", "El mail es obligatorio").not().isEmpty(),
        check("email", "El mail no es válido").isEmail(),
        check("password", "El password debe ser minimo 6 caracteres").isLength({
            min: 6
        }),
        recolectarErrores
    ]


,login);

router.delete("/:email",
    [
        validarJWT,
        isAdmin,
        check("email", "El mail es obligatorio").not().isEmpty(),
        check("email", "El mail no es válido").isEmail(),
        recolectarErrores
   ]
    ,deleteUser);


export default router;