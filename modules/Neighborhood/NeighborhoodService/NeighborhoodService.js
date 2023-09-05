const NeighborhoodModel = require('../NeighborhoodModel/NeighborhoodModel')
require("../../../db/db");
require('../../middlewares/auth');

class NeighborhoodService {
    async addNeighborhood(info) {

        // const {email, name, password, age, department} = info;

        return NeighborhoodModel.addNeighborhood(info);
    }

    async getNeighborhoods() {
        return NeighborhoodModel.getNeighborhoods();
    }
    async getNeighborhood(key, value) {
        return NeighborhoodModel.getNeighborhood(key, value);
    }
    async updateNeighborhood(id, info) {
        return NeighborhoodModel.updateNeighborhood(id, info);
    }

    async deleteNeighborhood(id) {
        return NeighborhoodModel.deleteNeighborhood(id);
    }

}

module.exports = new NeighborhoodService();