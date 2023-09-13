const db = require('../../../db/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { File_Manager, User_Files} = require("../../../db/DatabaseTables");

class fManagerModel {

    static fileCounter = 0;

    constructor() {
        // Define the storage configuration
        this.storage = multer.diskStorage({
            destination: (req, file, cb) => {
                // Determine the destination directory based on the user's ID
                // const userId = req.params.userId;
                const folder = req.url.includes('/users/') ? 'users' : 'apartments';
                const uploadPath = path.join(__dirname, `../../../public/uploads/${folder}`);
                fs.mkdirSync(uploadPath, { recursive: true });
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                // Generate a unique new name for the file
                const currentDate = new Date().toISOString().replace(/[:-]/g, '').slice(0,8); // Remove colons and hyphens
                const currentTime = new Date().toISOString().replace(/[:-]/g, '').slice(9,15); // Remove colons and hyphens
                const new_name = `${currentDate}-${currentTime}-${fManagerModel.fileCounter++}${path.extname(file.originalname)}`;
                cb(null, new_name);
            },
        });

        const maxCount = 10; // Define the maximum number of files to upload (adjust as needed)
        this.upload = multer({ storage: this.storage });

        this.uploadMiddleware = this.upload.array('files', maxCount);
    }

    async uploadFile(fileData, req) {

        try {
            // Access the uploaded file details from the fileData parameter
            const { originalname, filename } = req.files;

            // Determine the folder based on the request URL
            const folder = req.url.includes('/users/') ? 'users' : 'apartments';

            const new_path = `uploads/${folder}/${filename}`;

            let [file_id] = await db(File_Manager).insert({
                old_name: originalname, new_name: filename, folder, path: new_path
            });

            return {
                file_id,
                message: 'File uploaded successfully',
                file: { original_name: originalname, new_name: filename, folder, path: new_path },
            };
        } catch (error) {
            console.error('Error uploading and inserting file:', error);
            throw error;
        }

    }

    async bulkInsertFiles(files, req) {
        const folder = req.url.includes('/users/') ? 'users' : 'apartments';
        // let filesID = []

        try {
            // Create an array of values to be inserted
            const values = files.map((file) => ({

                old_name: file.originalname,
                new_name: file.filename,
                folder: folder,
                path: `uploads/${folder}/${file.filename}`,
            }));

            // Execute the bulk insert query
            const [file_id] =  await db(File_Manager).insert(values);
            // console.log(file_id)

            return file_id;
        } catch (error) {
            console.error('Error performing bulk insert:', error);
            throw error;
        }
    }

    async getUserFiles(userId) {
        let filesWithData = [];
        try {
            // Execute the query to fetch user files by user_id
            const userFiles = await db(User_Files).where('user_id', userId);


            // Fetch the file content for each user file
            return await Promise.all(userFiles.map(async (record) => {

                const fileData = await db(File_Manager).where('file_id', record.file_id);

                return fileData[0];
            }));
        } catch (error) {
            console.error('Error fetching user files:', error);
            throw error;
        }
    }

    async deleteFile(file_id) {
        try {
            // Fetch file details from the database
            const fileDetails = await db(File_Manager).where('file_id', file_id );

            if (fileDetails.length === 0) {
                new Error('File not found');
            }

            const { folder, new_name } = fileDetails[0];

            // Delete the file from the server's file system
            const filePath = `${__dirname}/../../../public/uploads/${folder}/${new_name}`;
            console.log(filePath)
            await fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    throw err;
                }

                // Delete the file record from the database
                await db(File_Manager)
                    .where({file_id})
                    .del();
            });

            return { message: 'File deleted successfully' };
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }


}

module.exports = new fManagerModel();
