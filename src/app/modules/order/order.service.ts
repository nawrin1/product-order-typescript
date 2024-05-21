
import { orderModel } from '../order.model';
import { OrderInterface } from './order.interface';

const postOrderIntoDB=async(orderData:OrderInterface)=>{
    try{
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