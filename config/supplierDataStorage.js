const multer = require('multer');

const supplierStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './documents/supplierData/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1]);
    }
});

const companyStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './documents/companyData/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1]);
    }
});

const supplierUpload = multer({storage: supplierStorage});
const companyUpload = multer({storage: companyStorage});

module.exports.supplierUpload = supplierUpload;
module.exports.companyUpload = companyUpload;