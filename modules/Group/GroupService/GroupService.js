const GroupModel = require('../GroupModel/GroupModel')

class GroupService {
    async addGroup(info) {
        return GroupModel.addGroup(info);
    }

    async getGroups() {
        return GroupModel.getGroups();
    }

    async getGroup(key, value) {
        return GroupModel.getGroup(key, value);
    }

    async updateGroup(id, info) {
        return GroupModel.updateGroup(id, info);
    }

    async deleteGroup(id) {
        return GroupModel.deleteGroup(id);
    }

    async assignPermissionToGroup(code_id, group_id) {
        return GroupModel.assignPermissionToGroup(code_id, group_id);
    }

    async updatePermissionOfGroup(code_id, group_id, info) {
        return GroupModel.updatePermissionOfGroup(code_id, group_id, info);
    }

    async getPermissionOfGroup(code_id, group_id) {
        return GroupModel.getPermissionOfGroup(code_id, group_id);
    }

    async getPermissionsOfGroup(group_id) {
        return GroupModel.getPermissionsOfGroup(group_id);
    }

    async deletePermissionOfGroup(code_id, group_id) {
        return GroupModel.deletePermissionOfGroup(code_id, group_id);
    }

    async deletePermissionsOfGroup(group_id) {
        return GroupModel.deletePermissionsOfGroup(group_id);
    }

}

module.exports = new GroupService();