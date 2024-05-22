import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productJoiValidation from './product.validation';
// import { ProductInterface } from './product.interface';
// import { productModel } from '../product.model';

const postProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const { error, value } = productJoiValidation.validate(productData);
    await ProductServices.postProductIntoDB(productData);
    // console.log(error, value);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: value,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  const queryKeys = Object.keys(req.query);

  if (queryKeys.length > 0 && queryKeys[0] !== 'searchTerm') {
    return res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  }
  const search =
    typeof req.query.searchTerm === 'string' ? req.query.searchTerm : null;
  if (search) {
    // console.log(search)
    try {
      const result:any = await ProductServices.getAllProductFromDB(search);
      // console.log(result)
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${search}' fetched successfully!`,
          data: result,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Product not available`,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'something wrong',
        error: err,
      });
    }
  } else {
    // console.log(search)
    try {
      const result = await ProductServices.getAllProductFromDB(null);
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'something wrong',
        error: err,
      });
    }
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    if (productId) {
      const result = await ProductServices.getSingleProductFromDB(productId);
      // console.log(result)
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Product fetched successfully!',
          data: result,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: 'product not available',
        });
      }
    } else {
      const result = await ProductServices.getAllProductFromDB(null);
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updateData = req.body;
  try {
    const { value } = productJoiValidation.validate(updateData);
    const result = await ProductServices.updateProductDb(productId, value);

    // console.log(result)

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deletedExist =
      await ProductServices.getSingleProductFromDB(productId);
    if (deletedExist) {
      await ProductServices.deleteProductDb(productId);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    }

    // console.log(result,"from del2")
    else {
      res.status(500).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something wrong',
      error: err,
    });
  }
};

export const productController = {
  postProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
