const PermissionService = require('../PermissionService/PermissionService');

class PermissionController {
    async addPermission(req, res) {
        try {
            const id = await PermissionService.addPermission(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getPermissions(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const permission = await PermissionService.getPermission(key, value);
                return res.status(200).json(permission);

            }
            const permission = await PermissionService.getPermissions();
            return res.status(201).json(permission);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getPermission(req, res) {
        try {
            const code_id = req.params.code_id;
            const permission = await PermissionService.getGroup('code_id', code_id);
            return res.status(200).json(permission);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updatePermission(req, res) {
        try {
            const code_id = req.params.code_id;
            const q = await PermissionService.updatePermission(code_id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deletePermission(req, res) {
        try {
            const code_id = req.params.code_id;
            const q = await GroupService.deletePermission(code_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

}

module.exports = new PermissionController();