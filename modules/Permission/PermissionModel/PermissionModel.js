const db = require('../../../db/db');

class PermissionModel {
    async addPermission(info) {
        let [code_id] = await db('permission').insert({
            code_id: info.code_id, name: info.name
        });

        return code_id.code_id + code_id.name;
    }

    async getPermissions() {
        let permissions = await db.select().from('permission');
        // await db.destroy();
        return permissions;
    }
    async getPermission(key, value) {
        let permission;
        permission = await db('permission').where(key, value);
        // console.log()
        return permission;
    }

    async updatePermission(id, info) {

        return db('permission')
            .where({ code_id: id })
            .update({
                name: info.name,
            }, ['code_id']);

    }
    async deletePermission(id) {
        return db('permission')
            .where({ code_id: id })
            .del();
    }



}

module.exports = new PermissionModel();