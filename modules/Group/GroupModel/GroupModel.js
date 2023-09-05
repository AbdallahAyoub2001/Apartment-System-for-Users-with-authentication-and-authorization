const db = require('../../../db/db');

class GroupModel {
    async addGroup(info) {
        let [id] = await db('group').insert({
            name: info.name
        });

        const groupPermissions = info.permissions;
        for (const value of groupPermissions) {
            // let [perm] = await db('group_permission').insert({
            //     group_id: id, code_id: value
            // });
            await this.assignPermissionToGroup(value, id);
        }

        return id;
    }

    async getGroups() {
        // await db.destroy();
        return db.select().from('group');
    }

    async getGroup(key, value) {
        let group;
        group = await db('group').where(key, value);
        let permission = await this.getPermissionsOfGroup(value);
        // console.log()
        return [group, permission];
    }

    async updateGroup(id, info) {
        const groupPermissions = info.permissions;
        await this.deletePermissionsOfGroup(id);
        for (const value of groupPermissions) {
            await this.assignPermissionToGroup(value, id);
        }

        return db('group')
            .where({ group_id: id })
            .update({
                name: info.name,
            }, ['group_id']);

    }
    async deleteGroup(id) {
        let del = this.deletePermissionsOfGroup(id);

        if(del)
            return db('group')
                .where({ group_id: id })
                .del();

        return false;
    }

    async assignPermissionToGroup(code_id, group_id) {
        let [assignment] = await db('group_permission').insert({
            group_id, code_id
        });

        return assignment.toString();
    }

    async updatePermissionOfGroup(code_id, group_id, info) {
        return db('group_permission')
            .where({ group_id, code_id })
            .update({
                code_id: info.code_id,
            }, ['code_id', 'group_id']);
    }

    async getPermissionOfGroup(code_id, group_id) {
        let permission;
        permission = await db('group_permission').select('*')
            .where({ group_id: group_id, code_id: code_id });
        // console.log()
        return permission;
    }

    async getPermissionsOfGroup(group_id) {
        let permissions;
        permissions = await db('group_permission').select('*')
            .where({ group_id: group_id});
        // console.log()
        return permissions;
    }

    async deletePermissionOfGroup(code_id, group_id) {
        return db('group_permission')
            .where({ group_id: group_id, code_id: code_id })
            .del();
    }

    async deletePermissionsOfGroup(group_id) {
        return db('group_permission')
            .where({ group_id: group_id })
            .del();
    }

}

module.exports = new GroupModel();