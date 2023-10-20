import { Model, ObjectId, Schema, model } from "mongoose";


export interface IUser{

    nombre: string;
    direccion: String;
    telefono: number;
    email: string;
    password: string;
    estado?: Boolean;
    rol?: String;
}


const UserSchema = new Schema<IUser>({

    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    rol: {
        type: String,
        default: "S0yU5er"
    }

});

UserSchema.methods.toJSON = function() {
    const {__v,_id, estado,password, ...user} = this.toObject();
    return user
}

const User: Model<IUser> = model<IUser>("User", UserSchema);

export default User