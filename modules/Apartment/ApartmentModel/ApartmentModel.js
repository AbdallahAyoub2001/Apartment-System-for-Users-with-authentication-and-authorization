const db = require('../../../db/db');
const { Apartments, Apartment_Files} = require('../../../db/DatabaseTables');

class ApartmentModel {
    async addApartment(info) {
        let [id] = await db(Apartments).insert({
            type: info.type, status: info.status
        });
        // await db.destroy();

        return id;
    }

    async assignFilesToApartment(apartment_id, filesID) {

        try {
            if(!Array.isArray(filesID)){
                const [id] = await db(Apartment_Files).insert({
                    apartment_id, file_id: filesID,
                });
                return id;
            } else {
                // Create an array of values to be inserted
                const values = filesID.map((file) => ({
                    apartment_id,
                    file_id: file,
                }));

                // Execute the bulk insert query
                const [id] = await db(Apartment_Files).insert(values);
                return id;
            }

        } catch (err) {
            console.error('Error Adding files to Apartment_Files table:', err);
            throw err;
        }
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

    async deleteFileOfApartment(file_id) {
        return db(Apartment_Files)
            .where({ file_id })
            .del();
    }

}

module.exports = new ApartmentModel();