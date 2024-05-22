import Joi from 'joi';

const productJoiValidation = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Product Name should be a type of text',
    'string.empty': 'Product Name is required',
    'any.required': 'Product Name is required',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description should be a type of text',
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
  }),
  price: Joi.number().required().messages({
    'number.base': 'Price should be a type of number',
    'number.empty': 'Price is required',
    'any.required': 'Price is required',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Category should be a type of text',
    'string.empty': 'Category is required',
    'any.required': 'Category is required',
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'Tags should be an array',
    'array.includes': 'Tags should be a type of text',
    'any.required': 'Tags are required',
  }),
  variants: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required().messages({
          'string.base': 'Variant type should be a type of text',
          'string.empty': 'Variant type is required',
          'any.required': 'Variant type is required',
        }),
        value: Joi.string().required().messages({
          'string.base': 'Variant value should be a type of text',
          'string.empty': 'Variant value is required',
          'any.required': 'Variant value is required',
        }),
      }),
    )
    .required()
    .messages({
      'array.base': 'Variants should be an array',
      'any.required': 'Variants are required',
    }),
  inventory: Joi.object({
    quantity: Joi.number().required().messages({
      'number.base': 'Quantity should be a type of number',
      'number.empty': 'Quantity is required',
      'any.required': 'Quantity is required',
    }),
    inStock: Joi.boolean().default(true).messages({
      'boolean.base': 'InStock should be a type of boolean',
    }),
  })
    .required()
    .messages({
      'object.base': 'Inventory should be an object',
      'any.required': 'Inventory is required',
    }),
});

export default productJoiValidation;
