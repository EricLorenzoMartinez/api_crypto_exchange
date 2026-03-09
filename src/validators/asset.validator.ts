import Joi from 'joi';

export const assetIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'string.base': '"id" must be a text string',
        'string.hex': '"id" must be a valid MongoDB ObjectId (hexadecimal)',
        'string.length': '"id" must be exactly 24 characters',
        'any.required': '"id" is required',
    }),
});

export const createAssetSchema = Joi.object({
    symbol: Joi.string().required().messages({
        'string.base': '"symbol" must be a text string',
        'any.required': '"symbol" is required',
    }),
    name: Joi.string().required().messages({
        'string.base': '"name" must be a text string',
        'any.required': '"name" is required',
    }),
    coincapId: Joi.string().required().messages({
        'string.base': '"coincapId" must be a text string',
        'any.required': '"coincapId" is required',
    }),
});

export const updateAssetSchema = createAssetSchema;