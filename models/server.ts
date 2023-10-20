import express, {Express} from "express";
import {conectarDB} from "../database/config"
import userRoutes from "../routes/users"
import orderRoutes from "../routes/orders"
import productsRoutes from "../routes/products"
import cors from "cors";

export class Server{

    app: Express 
    port: string | number | undefined

    constructor(){
        this.app=express();
        this.port = process.env.PORT
        this.conexionaBD();
        this.middlewares();
        this.routes();
    }

    routes(): void {
        this.app.use("/users", userRoutes);
        this.app.use("/orders",orderRoutes);
        this.app.use("/products",productsRoutes);
        
    }

    middlewares(): void {
        this.app.use(express.json())
        this.app.use(cors()) //se usar para que puedan conectar a la api y retringir metodos
     }

    async conexionaBD(): Promise<void> {
        await conectarDB()
    }

    listen():void{
        this.app.listen(8080,()=>{
            console.log(`Corriendo en puerto ${this.port}`)
        });
    }
}