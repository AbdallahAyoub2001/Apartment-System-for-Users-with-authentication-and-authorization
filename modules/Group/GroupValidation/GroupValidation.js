const { body, validationResult, param} = require('express-validator')
const db = require("../../../db/db");
const {Group, Group_Permission, Permission} = require('../../../db/DatabaseTables');

// check that the name isn't empty
let name = body('name').notEmpty().withMessage('Name cannot be empty');

// check that the given group_id belongs to a user
let group_id = param('group_id').custom(async (value) => {
    const apartment = await db(Group).where('group_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Group does not exist!!');

let group_id_exist = param('group_id').custom(async (value) => {
    const apartment = await db(Group_Permission).where('group_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Group does not exist!!');

let code_id = param('code_id').custom(async (value) => {
    const apartment = await db('permission').where('code_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Permission does not exist!!');

let code_id_exist = param('group_code_id').custom(async (value) => {
    const apartment = await db(Group_Permission).where('code_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Permission does not exist!!');

let new_code_id = body('code_id').custom(async (value) => {
    const apartment = await db(Permission).where('code_id', value).first();
    if (!apartment) {
        throw new Error();
    }
    return true;
}).withMessage('Permission does not exist!!');

const validatePermissionIndices = body('permissions')
    .isArray({ min: 1 }).withMessage('There are no permission attached!')
    .custom(async (permissions) => {
        // console.log(permissions);
        const existingIds = await db(Permission)
            .whereIn('code_id', permissions);

        const existingIdsSet = new Set(existingIds.map(item => item.code_id));

        const missingIds = permissions.filter(id => !existingIdsSet.has(id));

        if (missingIds.length > 0) {
            throw new Error(`IDs ${missingIds.join(', ')} do not exist in the permissions`);
        }

        return true; // Validation passed
    });

const postValidation = [
    name,
    validatePermissionIndices
]

const putValidation = [
    group_id,
    name,
    validatePermissionIndices
]

const getValidation = [
    group_id
]

const deleteValidation = [
    group_id
]

const permissionAssignment = [ // validate adding the same permission twice to the same group (group_id with the same code_id)
    code_id,
    group_id,
]

const getGroupPermission = [
    code_id_exist,
    group_id_exist
]

const getGroupPermissions = [
    group_id_exist
]

const updateGroupPermission = [
    code_id_exist,
    group_id_exist,
    new_code_id
]

const deleteGroupPermission = [
    code_id_exist,
    group_id_exist
]

const deleteGroupPermissions = [
    group_id_exist
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
    permissionAssignmentValidation: permissionAssignment,
    getGroupPermissionValidation: getGroupPermission,
    getGroupPermissionsValidation: getGroupPermissions,
    updateGroupPermissionValidation: updateGroupPermission,
    deleteGroupPermissionValidation: deleteGroupPermission,
    deleteGroupPermissionsValidation: deleteGroupPermissions,

    validate,
}