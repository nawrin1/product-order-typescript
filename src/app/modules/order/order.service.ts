
import { orderModel } from '../order.model';
import { productModel } from '../product.model';
import { OrderInterface } from './order.interface';

const postOrderIntoDB=async(orderData:OrderInterface)=>{

    try{
        // const orderExist=await productModel.find({_id:orderData.productId})
        // // console.log(orderExist)
        // return orderExist;

        const result= await orderModel.create(orderData)
        return result


    }
    catch(err){
       console.log(err)
        
    }


}
const getAllOrderFromDB=async(email:string|null)=>{
    if (email){
        

        const result= await orderModel.find({email:email});
        return result;


    }
    else{
    try{
        const result=await orderModel.find()
        return result;

    }
    catch(err){
        console.log(err)
    }}

}


export const OrderServices={
    postOrderIntoDB,
    getAllOrderFromDB,

}