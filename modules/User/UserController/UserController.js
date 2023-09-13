const userService = require('../UserService/userService');
const fManager = require('../../fileManager/fManagerModel/fManagerModel');
const {User_Files} = require("../../../db/DatabaseTables");
const db = require('../../../db/db');

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
            return res.status(500).json("Couldn't assign the user to the group!");
        }
    }

    async assignFilesToUser(req, res) {
        const userId = req.params.user_id;
        try {
            // fManager.upload middleware handles file upload
            fManager.upload.array('file')(req, res, async function (err) {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).json({ message: 'File upload failed' });
                }

                // Access the uploaded file details from req.file
                const uploadedFiles = req.files;
                // console.log(uploadedFiles)

                const results = await fManager.bulkInsertFiles(uploadedFiles, req);
                await userService.assignFilesToUser(userId, results.file_id);

                // Loop through uploaded files and process them
                // for (const uploadedFile of uploadedFiles) {
                //     // Call the addFileToServer method to handle metadata insertion for each file
                //     const result = await fManager.uploadFile(uploadedFile, req);
                //     await userService.assignFileToUser(userId, result.file_id);
                //     results.push(result);
                // }

                res.status(200).json(results);
            });

        } catch (error) {
            console.error('Error handling file upload and insertion:', error);
            return res.status(500).json({ message: 'File upload and insertion failed' });
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

            let userFiles = await db(User_Files).where('user_id', id);
            console.log(userFiles)
            for(const file of userFiles){
                await fManager.deleteFile(file.file_id);
                await userService.deleteFileOfUser(file.file_id);
            }

            const q = await userService.deleteUser(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteFileOfUser(req, res) {
        const { file_id } = req.params;

        try {
            // Calling the deleteFile method to delete the file from the server and database
            await fManager.deleteFile(file_id);
            await userService.deleteFileOfUser(file_id);

            return res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error deleting file:', error);
            return res.status(500).json({ message: 'File deletion failed' });
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

            if (req.files || Object.keys(req.files).length > 0) {
                fManager.upload.single('file')(req, res, async function (err) {
                    if (err) {
                        console.error('Error uploading file:', err);
                        return res.status(500).json({message: 'File upload failed'});
                    }

                    // Access the uploaded file details from req.file
                    const uploadedFiles = req.files;

                    // Loop through uploaded files and process them
                    for (const uploadedFile of uploadedFiles) {
                        // Call the addFileToServer method to handle metadata insertion for each file
                        const result = await fManager.uploadFile(uploadedFile, req);
                        await userService.assignFileToUser(userId, result.file_id);
                    }

                });
            }

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