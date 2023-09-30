const express = require('express');
const Router = express.Router();

const { getSupplier, addSupplier, editProfile, acceptContract, rejectContract, downloadFiles, downloadCompanyFile } = require('../controllers/supplierControllers');

Router.route('/getSupplier').post(getSupplier);
Router.route('/addSupplier').post(addSupplier);
Router.route('/editProfile').put(editProfile);
Router.route('/acceptContract').put(acceptContract);
Router.route('/rejectContract').put(rejectContract);
Router.route('/downloadFiles').post(downloadFiles);
Router.route('/downloadCompanyFile').post(downloadCompanyFile);

module.exports = Router;