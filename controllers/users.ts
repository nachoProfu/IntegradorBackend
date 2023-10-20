import { Request,Response } from "express";
import User, {IUser} from "../models/user"
import bcryptjs from "bcryptjs"
import { generarJWT } from "../helpers/generarJWT";
import { sendEmail } from "../mailer/mailer";

//get usuario 

export const getUsers = async (req:Request, res:Response) =>{

    const condicion = { estado: true};


    const user = await User.find(condicion)
        .populate("nombre" ,"email");

    res.json({
        user
    })
};




//crear usuario


export const createUser = async (req:Request, res:Response): Promise<void> =>{

    const userData: IUser = req.body;

    const {nombre,direccion,telefono,email,password,rol}: IUser = req.body;

    const salt = bcryptjs.genSaltSync();



     if( !nombre || !email || !password ){
         res.json({msg:"Faltan datos obligatorios"});
         return;
     }

    const userEnDB = await User.findOne({email:email});

    if (userEnDB) {
        res.json({
            msge: "El usuario ya está registrado"
        })
        return
    }



    const user = new User({
        nombre,
        direccion,
        telefono,
        email,
        password,
        rol
    });

    //ACA deberia ir encriptacion de pass
    //ver como hacer la encriptacion de password
    user.password = bcryptjs.hashSync(password,salt);


    //chequeo si es admin o user

    const keyAdmin = req.headers["admin-key"];

    if (keyAdmin === process.env.KEYFORADMIN) {
        user.rol = "S0y4dmin"
    }


    await user.save();

    await sendEmail(user.email);

    res.status(201).json({
        msg: "Usuario creado correctamente",
        user
    })
}

//usra JWT

export const login = async (req:Request,res:Response):Promise<void> =>{

    const {email,password}:IUser = req.body;

    try {
       const usuario= await User.findOne({email});
       
       if(!usuario){
        res.status(404).json({msg:"No existe usuario en sistema"});
        return;
       }

       const validarPassword = bcryptjs.compareSync(password, usuario.password);

       if(!validarPassword){
        res.status(404).json({msg:"La Contraseña es Incorrecta"});
        return
       }

       //continuar para el logueo de usuario
       const token = await generarJWT(usuario.id);

       res.status(202).json({
        usuario,
        token
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        }) 
        
    }
}

//ver si es necesario funcion para verificar usuario


export const deleteUser = async (req:Request,res:Response):Promise<void>  =>{

     const {email} = req.params;

     const userEnDB = await User.findOne({email:email});

     //console.log(userEnDB);
    
     if(!userEnDB){
         res.json({msg:"No existe el usuario en Base de datos"})
         return;
     }

     console.log("antes de actualizar el usuario");
     
     const userDelete = User.findOneAndUpdate(
            {_id: userEnDB._id},
            {estado: false},
            {new: true}
     );

     res.status(201).json({
        msg:"usuario actualizado" ,
        userDelete
     });

};

