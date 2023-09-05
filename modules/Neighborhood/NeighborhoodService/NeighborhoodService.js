const NeighborhoodModel = require('../NeighborhoodModel/NeighborhoodModel')

class NeighborhoodService {
    async addNeighborhood(info) {
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