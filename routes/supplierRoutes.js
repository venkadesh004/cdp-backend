const express = require('express');
const Router = express.Router();

const { getSupplier, addSupplier, editProfile, acceptContract, rejectContract, downloadFiles, downloadCompanyFile, getSupplierID, getRequests, getAcceptedStatus } = require('../controllers/supplierControllers');

Router.route('/getSupplier').post(getSupplier);
Router.route('/addSupplier').post(addSupplier);
Router.route('/editProfile').put(editProfile);
Router.route('/acceptContract').put(acceptContract);
Router.route('/rejectContract').put(rejectContract);
Router.route('/downloadFiles/:id').get(downloadFiles);
Router.route('/downloadCompanyFile').get(downloadCompanyFile);
Router.route('/getSupplierID/:id').get(getSupplierID);
Router.route('/getRequests/:id').get(getRequests);
Router.route('/getAcceptedStatus/:id').get(getAcceptedStatus);

module.exports = Router;