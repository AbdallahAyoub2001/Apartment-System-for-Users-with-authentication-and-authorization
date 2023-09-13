const userDAO = require('../UserModel/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'secret-key';

class userServices {
    async addUser(userInfo) {
        return userDAO.addUser(userInfo);
    }

    async assignUserToGroup(user_id, group_id) {
        return userDAO.assignUserToGroup(user_id, group_id);
    }

    async assignFileToUser(user_id, file_id) {
        return userDAO.assignFileToUser(user_id, file_id);
    }

    async assignFilesToUser(user_id, file_id) {
        return userDAO.assignFilesToUser(user_id, file_id);
    }

    async authenticateUser (userLoginInfo){
        let user = await userDAO.getUser('email', userLoginInfo.email);
        // console.log(userLoginInfo.email,user[0].password)
        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        const passwordMatch = await this.comparePasswords(userLoginInfo.password, user[0][0].password);
        if (!passwordMatch) {
            return { status: 401, message: 'Invalid credentials' };
        }

        const token = this.generateJWTToken(user[0][0].id, user[0][0].email);
        // console.log(token);
        return { status: 200, message: 'Sign in successful', token: token };
    };

    getUsers() {
        return userDAO.getUsers();
    }

    getUser(key, value) {
        return userDAO.getUser(key, value);
    }

    async getUsersOfGroup(group_id) {
        return userDAO.getUsersOfGroup(group_id);
    }

    async updateUser(id, userInfo) {
        return userDAO.updateUser(id, userInfo);
    }

    async deleteUser(id) {
        return userDAO.deleteUser(id);
    }

    async deleteFileOfUser(file_id) {
        return userDAO.deleteFileOfUser(file_id);
    }

    async deleteUserFromGroup(id, group_id) {
        return userDAO.deleteUserFromGroup(id, group_id);
    }

    async comparePasswords(password, hashedPassword) {
        try {
            // console.log(password + ' ' + hashedPassword);
            return await bcrypt.compare(password, hashedPassword);
        } catch (err) {
            throw err;
        }

    };

    generateJWTToken(userId, email) {
        return jwt.sign({ userId, email }, secretKey, { expiresIn: '1h' });
    };

}

module.exports = new userServices();