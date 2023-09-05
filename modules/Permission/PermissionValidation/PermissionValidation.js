const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");

// check that the name isn't empty
let name = body('name').notEmpty().withMessage('Name cannot be empty');

// check that the given code_id belongs to a user
let code_id = param('code_id').custom(async (value) => {
    const apartment = await db('permission').where('code_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Permission does not exist!!');

let id = body('code_id').notEmpty().withMessage('Code ID cannot be empty');

const postValidation = [
    id,
    name,
]

const putValidation = [
    code_id,
    name,
]

const getValidation = [
    code_id
]

const deleteValidation = [
    code_id
]

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    deleteValidation,
    putValidation,
    postValidation,
    getValidation,

    validate,
}