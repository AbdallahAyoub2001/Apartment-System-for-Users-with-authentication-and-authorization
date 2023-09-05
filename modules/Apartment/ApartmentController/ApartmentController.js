const ApartmentService = require('../ApartmentService/ApartmentService');

class ApartmentController {
    async addApartment(req, res) {
        try {
            const id = await ApartmentService.addApartment(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
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
            const user = await ApartmentService.getApartment('id', apartment_id);
            return res.status(200).json(user);
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

}

module.exports = new ApartmentController();