const db = require('../../../db/db');

class NeighborhoodModel {
    async addNeighborhood(info) {
        let [id] = await db('neighborhood').insert({
            name: info.name, location: info.location
        });
        // await db.destroy();

        return id;
    }

    async getNeighborhoods() {
        // await db.destroy();
        return db.select().from('neighborhood');
    }
    async getNeighborhood(key, value) {
        let Neighborhood;
        Neighborhood = await db('neighborhood').where(key, value);
        // console.log()
        return Neighborhood;
    }

    async updateNeighborhood(id, info) {

        return db('neighborhood')
            .where({ id: id })
            .update({
                name: info.name,
                location: info.location
            }, ['id']);

    }
    async deleteNeighborhood(id) {
        return db('neighborhood')
            .where({ id: id })
            .del();
    }

}

module.exports = new NeighborhoodModel();