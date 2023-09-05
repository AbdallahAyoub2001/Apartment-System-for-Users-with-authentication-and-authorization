const PermissionModel = require('../PermissionModel/PermissionModel')

class PermissionService {
    async addPermission(info) {
        return PermissionModel.addPermission(info);
    }

    async getPermissions() {
        return PermissionModel.getPermissions();
    }

    async getPermission(key, value) {
        return PermissionModel.getPermission(key, value);
    }

    async updatePermission(id, info) {
        return PermissionModel.updatePermission(id, info);
    }

    async deletePermission(id) {
        return PermissionModel.deletePermission(id);
    }

}

module.exports = new PermissionService();