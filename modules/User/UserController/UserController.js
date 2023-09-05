const userService = require('../UserService/userService');

class userController {
    async addUser(req, res) {
        try {
            const id = await userService.addUser(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async assignUserToGroup(req, res) {
        try {
            const user_id = req.params.user_id;
            const group_id = req.params.group_id;
            const q = await userService.assignUserToGroup(user_id, group_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Couldn't assign the permission to the group!");
        }
    }

    async getUsers(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const user = await userService.getUser(key, value);
                return res.status(200).json(user);

            }
            const users = await userService.getUsers();
            return res.status(201).json(users);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getUser(req, res) {
        try {
            const user_id = req.params.user_id;
            const user = await userService.getUser('id', user_id);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getUsersOfGroup(req, res) {
        try{
            const group_id = req.params.group_id;
            const users =  userService.getUsersOfGroup(group_id);
            return res.status(500).json(users[0]);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }

    }
    async updateUser(req, res) {
        try {
            const id = req.params.user_id;
            const q = await userService.updateUser(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.user_id;
            const q = await userService.deleteUser(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteUserFromGroup(req, res) {
        try {
            const id = req.params.user_id;
            const group_id = req.params.group_id;
            const q = await userService.deleteUserFromGroup(id, group_id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async signup(req, res){
        try {
            const userId = await userService.addUser(req.body);
            res.status(201).json({ userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while signing up' });
        }
    };

    async login(req, res) {
        try {

            const result = await userService.authenticateUser(req.body);
            res.status(result.status).json({ message: result.message, token: result.token });
        } catch (error) {
            console.error('Error signing in:', error);
            res.status(500).json({ error: 'An error occurred while signing in' });
        }
    };

}

module.exports = new userController();