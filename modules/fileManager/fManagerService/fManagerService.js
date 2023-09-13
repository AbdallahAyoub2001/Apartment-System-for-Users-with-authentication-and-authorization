const fileModel = require('../fManagerModel/fManagerModel');

module.exports = {
    async uploadFile(fileData) {
        return fileModel.uploadFile(fileData);
    },

    async getFileStream(fileId) {
        return fileModel.getFileStream(fileId);
    },

    async deleteFile(fileId) {
        return fileModel.deleteFile(fileId);
    },
};
