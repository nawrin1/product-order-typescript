import { Request, Response } from 'express';
import orderJoiValidation from './order.validation';
import { OrderServices } from './order.service';




const postOrder= async (req: Request, res: Response) => {
  try {


    const  orderData = req.body;

    const { error,value } = orderJoiValidation.validate(orderData);
    const result = await OrderServices.postOrderIntoDB(orderData);
   
    if (error){
      res.status(500).json({
        success: false,
        message: 'Something wrong',
        error:error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: value,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message||'something wrong',
      error: err,
    });
  }
};
const getAllOrders=async(req:Request,res:Response)=>{
    const email=typeof req.query.email === 'string' ? req.query.email : null;
    if(email){
        // console.log(search)
    try{
        const result=await OrderServices.getAllOrderFromDB(email)
        // console.log(result)
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for user email!",
            data: result,
          });

    }
    catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message||'something wrong',
            error: err,
          });
    }

    }
    else{
    // console.log(search)
    try{
        const result=await OrderServices.getAllOrderFromDB(null)
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
          });

    }
    catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message||'something wrong',
            error: err,
          });
    }}
   

}




export const orderController={
    postOrder,
    getAllOrders,

}
