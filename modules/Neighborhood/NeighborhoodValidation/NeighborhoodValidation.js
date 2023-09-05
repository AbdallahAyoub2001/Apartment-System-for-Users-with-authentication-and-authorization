const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");

// check that the name isn't empty
let name = body('name').notEmpty().withMessage('Name cannot be empty');

let location = body('location').notEmpty().withMessage('Location cannot be empty');

// check that the given id belongs to a user
let id = param('neighborhood_id').custom(async (value) => {
    const apartment = await db('neighborhood').where('id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Neighborhood does not exist!!');

const postValidation = [
    name,
    location,
]

const putValidation = [
    id,
    name,
    location,
]

const getValidation = [
    id
]

const deleteValidation = [
    id
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