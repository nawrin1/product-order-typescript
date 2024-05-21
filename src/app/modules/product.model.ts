import { Schema, model } from "mongoose";
import { ProductInterface } from "./product/product.interface";

const productSchema= new Schema<ProductInterface>({
    name:{
        type:String,
        required: [true, 'Product Name is required'],
        trim: true,
    },
    description:{
        type:String,
        required: [true, 'Description is required'],
        trim: true,
    },
    price:{
        type:Number,
        required: [true, 'Product price is required'],
        trim:true
        
    },
    category:{
        type:String,
        required: [true, 'Product category is required'],
        trim: true,
    },
    tags:{
        type:[String],
        required: [true, 'Product Name is required'],
        
    },
    variants: [
        {
          type: {
            type: String,
            required: [true,'variant type required']
          },
          value: {
            type: String,
            required: [true, 'variant value required']
          },
        }
      ],
      inventory:{
        quantity:{
            type:Number,
            required:[true, 'inventory quantity required']
        },
        inStock:{
            type:Boolean,
            default:true
        }

      }


})

export const productModel=model<ProductInterface>("Product",productSchema)