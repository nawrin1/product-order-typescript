import Joi from 'joi';

// Define the Joi schema
const orderJoiValidation = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of text',
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    productId: Joi.string().required().messages({
        'string.base': 'Product ID should be a type of text',
        'string.empty': 'Product ID cannot be an empty field',
        'any.required': 'Product ID is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price should be a number',
        'any.required': 'Price is required'
    }),
    quantity: Joi.number().required().messages({
        'number.base': 'Quantity should be a number',
        'any.required': 'Quantity is required'
    })
});

export default orderJoiValidation;
