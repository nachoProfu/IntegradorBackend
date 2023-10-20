import mongoose from "mongoose";


export const conectarDB = async (): Promise<void> =>{

    try {
        const URLdb = process.env.DB_URL;
        if(!URLdb){
            throw new Error("Conexion a DB no esta correctamente definida")
        }
        await mongoose.connect(URLdb);
        console.log("Base de datos online");
    
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar con base de datos")
        
    }
}
