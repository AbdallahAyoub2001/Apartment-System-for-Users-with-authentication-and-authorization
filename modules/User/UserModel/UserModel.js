const db = require('../../../db/db');
const bcrypt = require('bcrypt');
// const authService = require("../../middlewares/auth");

class UserModel {
    async addUser(userInfo) { // how to prevent adding user if the groups weren't added successfully
        const hashedPassword = await this.hashPassword(userInfo.password);

        let [id] = await db('users').insert({
            email: userInfo.email, name: userInfo.name, password: hashedPassword
        });

        const userGroups = userInfo.groups;
        for (const value of userGroups) {
            await this.assignUserToGroup(id, value);
        }

        return id;
    }

    async getUsers() {
        // await db.destroy();
        return db.select().from('users');
    }
    async getUser(key, value) {
        let user;
        user = await db('users').where(key, value);
        console.log(user[0].id)
        let groups = await this.getUserGroups(user[0].id);
        console.log(groups)
        return [user, groups];
    }

    // async getUserPassword(email) {
    //     let pass;
    //     pass = await db.select('password').from('users').where('email', email);
    //     return pass;
    // }

    async updateUser(id, userInfo) {
        const hashedPassword = await this.hashPassword(userInfo.password);

        const userGroups = userInfo.groups;
        await this.deleteUserGroups(id);
        for (const value of userGroups) {
            await this.assignUserToGroup(id, value);
        }

        return db('users')
            .where({ id: id })
            .update({
                email: userInfo.email,
                name: userInfo.name,
                password: hashedPassword,
                age: userInfo.age,
                department: userInfo.department
            }, ['id']);

    }
    async deleteUser(id) {
        let groups = this.deleteUserGroups(id);

        if(groups)
            return db('users')
                .where({ id: id })
                .del();
    }

    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    };

    async assignUserToGroup(user_id, group_id) {
        let [id] = await db('user_group').insert({
            user_id, group_id
        });

        return id;
    }

    // async updateUserGroups(id, group_id, info) {
    //     return db('user_group')
    //         .where({ group_id, code_id })
    //         .update({
    //             code_id: info.code_id,
    //         }, ['code_id', 'group_id']);
    // }

    async getUserGroups(user_id) {
        let groups;
        groups = await db('user_group').select('group_id')
            .where({ user_id });
        // console.log()
        return groups;
    }

    async getUsersOfGroup(group_id) {
        let users;
        users = await db('user_group').select('*')
            .where({ group_id: group_id});

        console.log(users)
        return users;
    }

    async deleteUserFromGroup(user_id, group_id) {
        return db('user_group')
            .where({ group_id, code_id })
            .del();
    }

    async deleteUserGroups(id) {
        return db('user_group')
            .where({ user_id: id })
            .del();
    }
}

module.exports = new UserModel();