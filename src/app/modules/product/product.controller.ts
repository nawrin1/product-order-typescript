import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productJoiValidation from './product.validation';


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

export const productController={
    postProduct
}
