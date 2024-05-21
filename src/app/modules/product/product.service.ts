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
const getAllProductFromDB=async(search:string|null)=>{
    if (search){
        const query = {
            $or: [
                { name: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { category: new RegExp(search, 'i') }
            ]
        };

        const result= await productModel.find(query);
        return result;


    }
    else{
    try{
        const result=await productModel.find()
        return result;

    }
    catch(err){
        console.log(err)
    }}

}
const getSingleProductFromDB=async(productId:string)=>{
   try{
    const result = await productModel.findOne({ _id: productId })
    
    return result
   }catch(err){
    console.log(err)
   }
}

const updateProductDb=async(productId:string,updateData:ProductInterface)=>{
    try{
        const result = await productModel.findByIdAndUpdate({ _id: productId }, { $set: updateData },{new:true});
        // console.log(result)
        return result;



    }
    catch(err){
        console.log(err)
    }

}

const deleteProductDb=async(productId:string)=>{
    try{
        const result=await productModel.findByIdAndDelete({ _id: productId })
        return result;

    }catch(err){
        console.log(err)
    }

}
export const ProductServices={
    postProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductDb,
    deleteProductDb
}