import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";



export const createProduct = async (req:Request,res:Response) =>{


    const data: IProduct = req.body;

    const product = new Product(data);

    await product.save();

    res.status(201).json({
        product
    })

}

export const getProducts = async (req:Request,res:Response) => {

    const products = await Product.find();


    res.json({products});

};


export const getProductById = async (req:Request,res:Response) => {

    const {id} =req.params;

    const product = await Product.findOne({id:id});


    res.json({product});

};