const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const { Users, User_Group, Group} = require('../../../db/DatabaseTables');

let email = body('email').notEmpty().isEmail().withMessage('Enter a valid email.');

// check that the name isn't empty
let name = body('name').notEmpty().withMessage('Name cannot be empty');

let password = body('password').notEmpty().isLength({ min: 5 }).withMessage('password should be at least 5 characters');

// check that the given id belongs to a user
let id = param('user_id').custom(async (value) => {
    const user = await db(Users).where('id', value).first();
    if (!user) {
        throw new Error();
    }
    return true;
}).withMessage('User does not exist!!');

let user_id_exist = param('user_id').custom(async (value) => {
    const apartment = await db(User_Group).where('user_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Group does not exist!!');

// check that the given group_id belongs to a user
let group_id = param('group_id').custom(async (value) => {
    const apartment = await db(Group).where('group_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Group does not exist!!');

let group_id_exist = param('group_id').custom(async (value) => {
    const apartment = await db(User_Group).where('group_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Group does not exist!!');

let file_id = param('file_id').custom(async (value) => {
    const file = await db('file_manager').where('file_id', value).first();

    if (!file) {
        throw new Error();
    }
    return true;
}).withMessage('File does not exist!!');

const validateGroupsIndices = body('groups')
    .isArray({ min: 1 }).withMessage('There are no groups attached!')
    .custom(async (groups) => {
        // console.log(permissions);
        const existingIds = await db(Group)
            .whereIn('group_id', groups);

        const existingIdsSet = new Set(existingIds.map(item => item.group_id));

        const missingIds = groups.filter(id => !existingIdsSet.has(id));

        if (missingIds.length > 0) {
            throw new Error(`IDs ${missingIds.join(', ')} do not exist in the groups`);
        }

        return true; // Validation passed
    });

const postValidation = [
    email,
    name,
    password,
    validateGroupsIndices
]

const putValidation = [
    id,
    email,
    name,
    password,
    validateGroupsIndices
]

const getValidation = [
    id
]

const deleteValidation = [
    id
]

const signupValidation = [
    email,
    name,
    password,
]

const loginValidation = [
    email,
    password
]

const addUserToGroupValidation = [
    id,
    group_id
]

const getGroupUsersValidation = [
    group_id_exist
]

const deleteUserFromGroupValidation = [
    user_id_exist,
    group_id_exist
]

const addUserFilesValidation = [
    id
]

const deleteUserFilesValidation = [
    file_id,
    id
]

const getUserFilesValidation = [
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
    signupValidation,
    loginValidation,
    addUserToGroupValidation,
    getGroupUsersValidation,
    deleteUserFromGroupValidation,
    addUserFilesValidation,
    deleteUserFilesValidation,
    getUserFilesValidation,
    validate,
}