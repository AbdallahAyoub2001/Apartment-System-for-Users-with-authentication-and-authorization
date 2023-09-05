const db = require('../../../db/db');
const { Permission} = require('../../../db/DatabaseTables');

class PermissionModel {
    async addPermission(info) {
        let [code_id] = await db(Permission).insert({
            code_id: info.code_id, name: info.name
        });

        return code_id.code_id + code_id.name;
    }

    async getPermissions() {
        return db.select().from(Permission);
    }
    async getPermission(key, value) {
        let permission;
        permission = await db(Permission).where(key, value);
        // console.log()
        return permission;
    }

    async updatePermission(id, info) {

        return db(Permission)
            .where({ code_id: id })
            .update({
                name: info.name,
            }, ['code_id']);

    }

    async deletePermission(id) {
        return db(Permission)
            .where({ code_id: id })
            .del();
    }

}

module.exports = new PermissionModel();