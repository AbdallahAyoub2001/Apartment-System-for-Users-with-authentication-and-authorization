const ApartmentService = require('../ApartmentService/ApartmentService');
const fManager = require("../../fileManager/fManagerModel/fManagerModel");

class ApartmentController {
    async addApartment(req, res) {
        try {
            const id = await ApartmentService.addApartment(req.body);

            if (req.files && req.files.length > 0) {

                const uploadedFiles = req.files;

                const results = await fManager.bulkInsertFiles(uploadedFiles, req);
                await ApartmentService.assignFilesToApartment(id, results);

                // });
            }

            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async assignFilesToApartment(req, res) {
        const apartment_id = req.params.apartment_id;
        try {

            const uploadedFiles = req.files;
            // console.log(uploadedFiles)

            const results = await fManager.bulkInsertFiles(uploadedFiles, req);
            await ApartmentService.assignFilesToApartment(apartment_id, results);

            res.status(200).json(results);

        } catch (error) {
            console.error('Error handling file upload and insertion:', error);
            return res.status(500).json({ message: 'File upload and insertion failed' });
        }
    }

    async getApartments(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const apartment = await ApartmentService.getApartment(key, value);
                return res.status(200).json(apartment);

            }
            const apartments = await ApartmentService.getApartments();
            return res.status(201).json(apartments);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getApartment(req, res) {
        try {
            const apartment_id = req.params.apartment_id;
            const apartment = await ApartmentService.getApartment('id', apartment_id);
            return res.status(200).json(apartment);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getApartmentFiles(req, res) {
        try {
            const apartment_id = req.params.apartment_id;
            const files = await fManager.getApartmentFiles(apartment_id);
            return res.status(200).json(files);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async updateApartment(req, res) {
        try {
            const id = req.params.apartment_id;
            const q = await ApartmentService.updateApartment(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteApartment(req, res) {
        try {
            const id = req.params.apartment_id;
            const q = await ApartmentService.deleteApartment(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteFileOfApartment(req, res) {
        const { file_id } = req.params;

        try {
            // Calling the deleteFile method to delete the file from the server and database
            await fManager.deleteFile(file_id);
            await ApartmentService.deleteFileOfApartment(file_id);

            return res.status(200).json({ message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error deleting file:', error);
            return res.status(500).json({ message: 'File deletion failed' });
        }
    }


}

module.exports = new ApartmentController();