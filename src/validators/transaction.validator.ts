import Joi from 'joi';

export const transactionIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
        'string.base': '"id" must be a text string',
        'string.hex': '"id" must be a valid MongoDB ObjectId (hexadecimal)',
        'string.length': '"id" must be exactly 24 characters',
        'any.required': '"id" is required',
    }),
});

export const createTransactionSchema = Joi.object({
    assetId: Joi.string().hex().length(24).required().messages({
        'string.base': '"assetId" must be a text string',
        'string.hex': '"assetId" must be a valid MongoDB ObjectId (hexadecimal)',
        'string.length': '"assetId" must be exactly 24 characters',
        'any.required': '"assetId" is required',
    }),
    type: Joi.string().valid('BUY', 'SELL').required().messages({
        'string.base': '"type" must be a text string',
        'any.only': '"type" must be either "BUY" or "SELL"',
        'any.required': '"type" is required',
    }),
    quantity: Joi.number().positive().required().messages({
        'number.base': '"quantity" must be a number',
        'number.positive': '"quantity" must be a positive number',
        'any.required': '"quantity" is required',
    }),
    notes: Joi.string().optional().messages({
         'string.base': '"notes" must be a text string',
     }),
});

export const updateTransactionSchema = Joi.object({
    executedAt: Joi.date().optional().messages({
        'date.base': '"executedAt" must be a valid date',
    }),
    notes: Joi.string().optional().messages({
        'string.base': '"notes" must be a text string',
    }),
});