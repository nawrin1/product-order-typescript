import { productModel } from "../product.model";
import { ProductInterface } from "./product.interface";

const postProductIntoDB=async(productData:ProductInterface)=>{
    try{
        const result= await productModel.create(productData)
        return result


    }
    catch(err){
       console.log(err)
        
    }


}

export const ProductServices={
    postProductIntoDB
}