const ApartmentModel = require('../ApartmentModel/ApartmentModel')

class ApartmentService {
    async addApartment(info) {

        // const {email, name, password, age, department} = info;

        return ApartmentModel.addApartment(info);
    }

    async getApartments() {
        return ApartmentModel.getApartments();
    }
    async getApartment(key, value) {
        return ApartmentModel.getApartment(key, value);
    }
    async updateApartment(id, info) {
        return ApartmentModel.updateApartment(id, info);
    }

    async deleteApartment(id) {
        return ApartmentModel.deleteApartment(id);
    }

}

module.exports = new ApartmentService();