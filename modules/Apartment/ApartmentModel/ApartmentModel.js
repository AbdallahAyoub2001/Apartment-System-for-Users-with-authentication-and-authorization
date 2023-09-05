const db = require('../../../db/db');

class ApartmentModel {
    async addApartment(info) {
        let [id] = await db('apartments').insert({
            type: info.type, status: info.status
        });
        // await db.destroy();

        return id;
    }

    async getApartments() {
        let apartments = await db.select().from('apartments');
        // await db.destroy();
        return apartments;
    }
    async getApartment(key, value) {
        let apartment;
        apartment = await db('apartments').where(key, value);
        // console.log()
        return apartment;
    }

    async updateApartment(id, info) {

        return db('apartments')
            .where({ id: id })
            .update({
                type: info.type,
                status: info.status
            }, ['id']);

    }
    async deleteApartment(id) {
        return db('apartments')
            .where({ id: id })
            .del();
    }

}

module.exports = new ApartmentModel();