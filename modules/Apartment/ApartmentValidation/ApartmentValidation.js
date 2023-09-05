const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");

// check that the name isn't empty
let type = body('type').notEmpty().withMessage('Type cannot be empty')
    .isIn(["Twin", "Master", "Triple", "Quadruple"])
    .withMessage("this type is invalid");

let status = body('status').notEmpty().withMessage('Status cannot be empty')
    .isIn(["Reserved", "Available", "Holding"]).withMessage("Invalid status");

// check that the given id belongs to a user
let id = param('apartment_id').custom(async (value) => {
    const apartment = await db('apartments').where('id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Apartment does not exist!!');

const postValidation = [
    type,
    status,
]

const putValidation = [
    id,
    type,
    status,
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