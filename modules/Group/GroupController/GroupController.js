const GroupService = require('../GroupService/GroupService');
// const PermissionService = require("../../Permission/PermissionService/PermissionService");

class GroupController {
    async addGroup(req, res) {
        try {
            const id = await GroupService.addGroup(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getGroups(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const group = await GroupService.getGroup(key, value);
                return res.status(200).json(group);
            }
            const groups = await GroupService.getGroups();
            return res.status(201).json(groups);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getGroup(req, res) {
        try {
            const group_id = req.params.group_id;
            const group = await GroupService.getGroup('group_id', group_id);
            return res.status(200).json(group);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updateGroup(req, res) {
        try {
            const id = req.params.group_id;
            const q = await GroupService.updateGroup(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteGroup(req, res) {
        try {
            const id = req.params.group_id;
            const q = await GroupService.deleteGroup(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async assignPermissionToGroup(req, res) {
        try {
            const code_id = req.params.code_id;
            const group_id = req.params.group_id;
            const q = await GroupService.assignPermissionToGroup(code_id, group_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Couldn't assign the permission to the group!");
        }
    }

    async getPermissionOfGroup(req, res) {
        try {
            const code_id = req.params.group_code_id;
            const group_id = req.params.group_id;
            const q = await GroupService.getPermissionOfGroup(code_id, group_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Couldn't assign the permission to the group!");
        }
    }

    async getPermissionsOfGroup(req, res) {
        try {
            const group_id = req.params.group_id;
            const q = await GroupService.getPermissionsOfGroup(group_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Couldn't assign the permission to the group!");
        }
    }

    async updatePermissionOfGroup(req, res) {
        try {
            const code_id = req.params.group_code_id;
            const group_id = req.params.group_id;
            const q = await GroupService.updatePermissionOfGroup(code_id, group_id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Couldn't update the permission of the group!");
        }
    }

    async deletePermissionOfGroup(req, res) {
        try {
            const code_id = req.params.group_code_id;
            const group_id = req.params.group_id;
            const q = await GroupService.deletePermissionOfGroup(code_id, group_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Couldn't update the permission of the group!");
        }
    }
    async deletePermissionsOfGroup(req, res) {
        try {
            const group_id = req.params.group_id;
            const q = await GroupService.deletePermissionsOfGroup(group_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Couldn't update the permission of the group!");
        }
    }

}

module.exports = new GroupController();