const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'supplierDatas/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const supplierUpload = multer({storage: storage});

module.exports = supplierUpload;