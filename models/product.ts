import { Model, Schema, model} from "mongoose"


export interface IProduct{
    id: Number,
    nombre: String,
    precio: Number,
    categoria: String,
    cardImg: String
}


const ProductSchema = new Schema<IProduct>({

    id:{
        type: Number,
        required: true,
    },
    nombre:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true,
    },
    categoria:{
        type: String,
        required: true,
    },
    cardImg:{
        type: String,
        required: true,
    }
});


ProductSchema.methods.toJSON = function() {
    const {__v,_id, ...product} = this.toObject();
    return product
}


const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;