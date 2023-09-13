const fileService = require('../fManagerService/fManagerService');

module.exports = {
    async uploadFile(req, res) {
        try {
            const fileData = req.file; // The uploaded file data
            const fileInfo = await fileService.uploadFile(fileData);
            res.status(201).json(fileInfo);
        } catch (error) {
            res.status(500).json({ error: 'File upload failed' });
        }
    },

    async getFile(req, res) {
        const fileId = req.params.fileId;
        const fileStream = await fileService.getFileStream(fileId);
        if (!fileStream) {
            return res.status(404).json({ error: 'File not found' });
        }
        fileStream.pipe(res);
    },

    async deleteFile(req, res) {
        const fileId = req.params.fileId;
        const deleted = await fileService.deleteFile(fileId);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    },
};
