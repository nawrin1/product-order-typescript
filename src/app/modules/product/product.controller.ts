import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productJoiValidation from './product.validation';
import { ProductInterface } from './product.interface';
import { productModel } from '../product.model';


const postProduct = async (req: Request, res: Response) => {
  try {


    const  productData = req.body;

    const { error,value } = productJoiValidation.validate(productData);
    const result = await ProductServices.postProductIntoDB(productData);
    // console.log(error, value);
    if (error){
      res.status(500).json({
        success: false,
        message: 'Somethnig wrong',
        error:error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
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
const getAllProducts=async(req:Request,res:Response)=>{
    try{
        const result=await ProductServices.getAllProductFromDB()
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
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

const getSingleProduct=async(req:Request,res:Response)=>{
    const {productId}=req.params

    try{
        if (productId){
           
            const result=await ProductServices.getSingleProductFromDB(productId)
            // console.log(result)
            if (result){
                        
            res.status(200).json({
                success: true,
                message:  "Product fetched successfully!",
                data: result,
              });

            }
            else{
               return res.status(500).json({
                    success: false,
                    message: 'product not available',
                    
                  });

            }


        }
        else{
            const result=await ProductServices.getAllProductFromDB()
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
          });

        }



    }
    catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message||'something wrong',
            error: err,
          });


    }
}

const updateProduct=async(req:Request,res:Response)=>{
    const {productId}=req.params
    const updateData = req.body;
    try{
        const { value } = productJoiValidation.validate(updateData);
        const result= await ProductServices.updateProductDb(productId,value)
        
        // console.log(result)
   
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
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

const deleteProduct=async(req:Request,res:Response)=>{
    try{
        const {productId}=req.params
        const result=await ProductServices.deleteProductDb(productId)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
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

export const productController={
    postProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
