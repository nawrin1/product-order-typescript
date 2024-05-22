import { ProductServices } from './../product/product.service';
import { Request, Response } from 'express';
import orderJoiValidation from './order.validation';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';




const postOrder= async (req: Request, res: Response) => {
  try {


    const  orderData = req.body;

    const { error,value } = orderJoiValidation.validate(orderData);
    const result = await ProductServices.getSingleProductFromDB(orderData.productId);
   
    if (error){
      return res.status(500).json({
        success: false,
        message: 'Validation error',
        error:error.details,
      })
    }
    // console.log(result,"from controller")
    if(result){
        if(result.inventory['quantity']>=orderData.quantity){
            const orderCreate= await OrderServices.postOrderIntoDB(orderData);
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: value,
              });

            const remaining=result.inventory['quantity']-orderData.quantity
            // console.log(remaining)
            if(remaining==0){
                // const StockValue=false
                const updateData={
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    category: result.category,
                    tags: result.tags,
                    variants: result.variants,
                    inventory: {
                        quantity: 0,
                        inStock: false
                    }
                }
                await ProductServices.updateProductDb(orderData.productId,updateData)
            }
            else{
                const updateData={
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    category: result.category,
                    tags: result.tags,
                    variants: result.variants,
                    inventory: {
                        quantity: remaining,
                        inStock: true
                    }
                }
                
                await ProductServices.updateProductDb(orderData.productId,updateData)

            }

        }
        else{
            return res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory"

                
              });

        }

    }
    else{
        return res.status(500).json({
            success: false,
            message:  "Order not found"
            
          });
    }

  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message||'something wrong',
      error: err,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
    // console.log(Object.keys(req.query)[0])
    const queryKeys = Object.keys(req.query);

    if (queryKeys.length > 0 && queryKeys[0] !== "email") {
        return res.status(404).json({
            success: false,
            message: "Route not found"
        });
    }


    const email = typeof req.query?.email === 'string' ? req.query?.email : null;

    try {
        const result = await OrderServices.getAllOrderFromDB(email);
        if(result.length>0){
            const message = email 
            ? "Orders fetched successfully for user email!" 
            : "Orders fetched successfully!";
        

        res.status(200).json({
            success: true,
            message,
            data: result,
        });

        }
        else{
            res.status(500).json({
                success: false,
                message: "email not available",
                
            });

        }
        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
};





export const orderController={
    postOrder,
    getAllOrders,

}
