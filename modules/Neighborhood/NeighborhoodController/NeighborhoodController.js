const NeighborhoodService = require('../NeighborhoodService/NeighborhoodService');

class NeighborhoodController {
    async addNeighborhood(req, res) {
        try {
            const id = await NeighborhoodService.addNeighborhood(req.body);
            return res.status(201).json(id);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getNeighborhoods(req, res) {
        try {
            let key = req.query.key;

            if(key){
                key = req.query.key;
                const value = req.query.value;
                const apartment = await NeighborhoodService.getNeighborhood(key, value);
                return res.status(200).json(apartment);

            }
            const apartments = await NeighborhoodService.getNeighborhoods();
            return res.status(201).json(apartments);

        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async getNeighborhood(req, res) {
        try {
            const apartment_id = req.params.neighborhood_id;
            const user = await NeighborhoodService.getNeighborhood('id', apartment_id);
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }
    async updateNeighborhood(req, res) {
        try {
            const id = req.params.neighborhood_id;
            const q = await NeighborhoodService.updateNeighborhood(id, req.body);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

    async deleteNeighborhood(req, res) {
        try {
            const id = req.params.neighborhood_id;
            const q = await NeighborhoodService.deleteNeighborhood(id);
            return res.status(200).json(q);
        } catch (err) {
            console.error(err);
            return res.status(500).json("Something went wrong!");
        }
    }

}

module.exports = new NeighborhoodController();