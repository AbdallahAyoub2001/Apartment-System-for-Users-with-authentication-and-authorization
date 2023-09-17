const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const { Users, User_Group, Group} = require('../../../db/DatabaseTables');
const fManager = require('../../fileManager/fManagerModel/fManagerModel');
const fs = require("fs");
const path = require('path');

let email = body('email').notEmpty().withMessage('Enter an Email!!').isEmail().withMessage('Enter a valid email.').custom(async (value) => {
    const existingUser = await db(Users).where('email', value).first();
    if (existingUser) {
        throw new Error('Email is already in use');
    }
    return true;
});

// check that the name isn't empty
let name = body('name').notEmpty().withMessage('Enter a name!!').withMessage('Name cannot be empty');

let password = body('password').notEmpty().withMessage('Enter a password!!').isLength({ min: 5 }).withMessage('password should be at least 5 characters');

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
}).withMessage('User does not exist!!');

let group_exist = body('group').notEmpty().withMessage('Enter a group.').custom(async (value) => {
    const group = await db(Group).where('group_id', value).first();
    if (!group) {
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

const filesCountValidation = body('file').custom(async (value, { req }) => {
        if(req.files && req.files.length > 1) {
            const folderPath = path.join(__dirname, `../../../public/uploads/Users`);

            // Delete additional files (if any)
            for (let i = 0; i < req.files.length; i++) {
                const file = await fManager.getFile(value.filename)
                const filePathToDelete = path.join(folderPath, file.new_name);
                await fs.unlink(filePathToDelete);
                console.log(`Deleted file: ${filePathToDelete}`)
            }
        } return true;
}).withMessage('You have to attach only one file!');

const postValidation = [
    email,
    name,
    password,
    group_exist
]

const putValidation = [
    id,
    email,
    name,
    password,
    group_exist
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
    group_exist,
    filesCountValidation,
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
    id,
    filesCountValidation
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
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

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