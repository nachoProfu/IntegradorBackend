import { Model, Schema, Types, model } from "mongoose";


//ver interface envio IShippngDetails

interface IShipment{
    nombre: String,
    direccion: String,
    telefono: Number
};


interface IItem{
    id: Number,
    nombre: String,
    precio: Number,
    quantity: Number
    
}

export interface IOrder{

    createdAt: Date;
    user: Types.ObjectId,
    items: IItem[],
    shipment: IShipment,
    status: String,
    total: Number
}

const OrderSchema = new Schema<IOrder>({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: {
        type: [{
            id:{type: Number,
                required: true
            },
            nombre: {
                type: String,
                required: true,
            },
            precio: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }],
        required: true,
    },
    shipment:{
        nombre:{
            type: String,
            required: true,
        },
        direccion:{
            type: String,
            required: true,
        },
        telefono:{
            type: Number,
            required: true,
        },
    },
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
})

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;