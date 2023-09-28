const express = require('express');
const Router = express.Router();

const { getSupplier, addSupplier, editProfile, acceptContract, rejectContract, downloadFiles, downloadCompanyFile } = require('../controllers/supplierControllers');

Router.route('/getSupplier').get(getSupplier);
Router.route('/addSupplier').post(addSupplier);
Router.route('/editProfile').put(editProfile);
Router.route('/acceptContract').put(acceptContract);
Router.route('/rejectContract').put(rejectContract);
Router.route('/downloadFiles').get(downloadFiles);
Router.route('/downloadCompanyFile').get(downloadCompanyFile);

module.exports = Router;