const db = require('../../../db/db');
const { Users, User_Group, User_Files} = require('../../../db/DatabaseTables');
const bcrypt = require('bcrypt');
// const fManager = require('../../fileManager/fManagerModel/fManagerModel');

class UserModel {
    async addUser(userInfo) { // how to prevent adding user if the groups weren't added successfully
        const hashedPassword = await this.hashPassword(userInfo.password);

        let [id] = await db(Users).insert({
            email: userInfo.email, name: userInfo.name, password: hashedPassword
        });

        const userGroups = userInfo.groups;
        for (const value of userGroups) {
            await this.assignUserToGroup(id, value);
        }

        return id;
    }

    async getUsers() {
        return db.select().from(Users);
    }

    async getUser(key, value) {
        let user;
        user = await db(Users).where(key, value);
        // console.log(user[0].id)
        let groups = await this.getUserGroups(user[0].id);
        // console.log(groups)
        return [user, groups];
    }

    async updateUser(id, userInfo) {
        const hashedPassword = await this.hashPassword(userInfo.password);

        const userGroups = userInfo.groups;
        await this.deleteUserGroups(id);
        for (const value of userGroups) {
            await this.assignUserToGroup(id, value);
        }

        return db(Users)
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
            return db(Users)
                .where({ id: id })
                .del();
    }

    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    };

    async assignUserToGroup(user_id, group_id) {
        let [id] = await db(User_Group).insert({
            user_id, group_id
        });

        return id;
    }

    async assignFileToUser(user_id, file_id) {

        let [id] = await db(User_Files).insert({
            user_id, file_id
        });

        return id;
    }

    async assignFilesToUser(user_id, filesID) {

        // console.log(files)
        try {
            if(!Array.isArray(filesID)){
                const [id] = await db(User_Files).insert({
                        user_id, file_id: filesID,
                });
                return id;
            } else {
                // Create an array of values to be inserted
                const values = filesID.map((file) => ({
                    user_id,
                    file_id: file,
                }));

                // Execute the bulk insert query
                const [id] = await db(User_Files).insert(values);
                return id;
            }

        } catch (err) {
            console.error('Error Adding files to User_Files table:', err);
            throw err;
        }
    }

    async getUserGroups(user_id) {
        let groups;
        groups = await db(User_Group).select('group_id')
            .where({ user_id });
        // console.log()
        return groups;
    }

    async getUsersOfGroup(group_id) {
        let users;
        users = await db(User_Group).select('*')
            .where({ group_id: group_id});

        // console.log(users)
        return users;
    }

    async deleteUserFromGroup(user_id, group_id) {
        return db(User_Group)
            .where({ group_id, code_id })
            .del();
    }

    async deleteFileOfUser(file_id) {
        return db(User_Files)
            .where({ file_id })
            .del();
    }

    async deleteUserGroups(id) {
        return db(User_Group)
            .where({ user_id: id })
            .del();
    }
}

module.exports = new UserModel();