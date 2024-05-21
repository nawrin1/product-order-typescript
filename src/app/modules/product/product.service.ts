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
const getAllProductFromDB=async()=>{
    try{
        const result=await productModel.find()
        return result;

    }
    catch(err){
        console.log(err)
    }

}
const getSingleProductFromDB=async(productId:string)=>{
   try{
    const result = await productModel.findOne({ _id: productId })
    
    return result
   }catch(err){
    console.log(err)
   }
}

export const ProductServices={
    postProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB
}