import { Schema, model } from "mongoose";

import { OrderInterface } from "./order/order.interface";

const orderSchema= new Schema<OrderInterface>({
    email:{
        type:String,
        required: [true, 'email is required'],
        trim: true,
    },
    productId:{
        type:String,
        required: [true, 'productId is required'],
        trim: true,
    },
    price:{
        type:Number,
        required: [true, ' price is required'],
        trim:true
        
    },
    quantity:{
        type:Number,
        required: [true, 'Quantity is required'],
        trim: true,
    },
    
    
      


})

export const orderModel=model<OrderInterface>("Order",orderSchema)