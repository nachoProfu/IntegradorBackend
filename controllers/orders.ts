import { Request,Response } from "express";
import { ObjectId } from "mongoose";
import Order, { IOrder } from "../models/order";



//crear orden 
export const createOrder = async (req: Request,res:Response) =>{

    const userId: ObjectId =req.body.userAuth._id;
    const orderData: IOrder =req.body;

    const data ={
        ...orderData,
        user: userId,
        createAt: Date.now(),
        status:"pendiente"
    };

    const order = new Order(data);

    await order.save();

    res.status(201).json({
        order
    })

}


//get orders


export const getOrder = async (req: Request,res:Response) =>{

    const userId: ObjectId =req.body.userAuth._id;

    const userQuery ={user : userId};

    const orders = await Order.find(userQuery);

    res.status(200).json({
        data: [
            ...orders
        ]
    })
}



