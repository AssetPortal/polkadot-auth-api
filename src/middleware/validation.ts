import { body } from 'express-validator';

export const verifyValidationRules = [
  body('message').isString().notEmpty().withMessage('"message" is required and must be a string.'),
  body('address').isString().notEmpty().withMessage('"address" is required and must be a string.'),
  body('signature').isString().notEmpty().withMessage('"signature" is required and must be a string.'),
];
