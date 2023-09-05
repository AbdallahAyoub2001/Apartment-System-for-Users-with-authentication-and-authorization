const db = require('../../../db/db');
const { Apartments } = require('../../../db/DatabaseTables');

class ApartmentModel {
    async addApartment(info) {
        let [id] = await db(Apartments).insert({
            type: info.type, status: info.status
        });
        // await db.destroy();

        return id;
    }

    async getApartments() {
        return db.select().from(Apartments);
    }

    async getApartment(key, value) {
        let apartment;
        apartment = await db(Apartments).where(key, value);
        // console.log()
        return apartment;
    }

    async updateApartment(id, info) {

        return db(Apartments)
            .where({ id: id })
            .update({
                type: info.type,
                status: info.status
            }, ['id']);

    }
    async deleteApartment(id) {
        return db(Apartments)
            .where({ id: id })
            .del();
    }

}

module.exports = new ApartmentModel();