const db = require('../../../db/db');
const { Neighborhood } = require("../../../db/DatabaseTables");

class NeighborhoodModel {
    async addNeighborhood(info) {
        let [id] = await db('neighborhood').insert({
            name: info.name, location: info.location
        });

        return id;
    }

    async getNeighborhoods() {
        return db.select().from(Neighborhood);
    }

    async getNeighborhood(key, value) {
        let Neighborhood;
        Neighborhood = await db(Neighborhood).where(key, value);
        return Neighborhood;
    }

    async updateNeighborhood(id, info) {

        return db(Neighborhood)
            .where({ id: id })
            .update({
                name: info.name,
                location: info.location
            }, ['id']);

    }

    async deleteNeighborhood(id) {
        return db(Neighborhood)
            .where({ id: id })
            .del();
    }

}

module.exports = new NeighborhoodModel();