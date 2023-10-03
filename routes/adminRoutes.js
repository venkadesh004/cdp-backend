const express = require('express');
const Router = express.Router();

const { getAdmin, addAdmin, getUnapprovedData, getApprovedData, allowSuppliers, denySuppliers, downloadFiles, getAdminID, allowCompanies, denyCompanies, downloadCompanyFIles, getUnapprovedCompData, getApprovedCompData } = require('../controllers/adminControllers');

Router.route('/getAdmin').post(getAdmin);
Router.route('/addAdmin').post(addAdmin);
Router.route('/getUnapprovedData').get(getUnapprovedData);
Router.route('/getApprovedData').get(getApprovedData);
Router.route('/allowSuppliers').put(allowSuppliers);
Router.route('/denySuppliers').put(denySuppliers);
Router.route('/downloadFiles/:id').get(downloadFiles);
Router.route('/getAdminID/:id').get(getAdminID);
Router.route('/allowCompanies').put(allowCompanies);
Router.route('/denyCompanies').put(denyCompanies);
Router.route('/downloadCompanyFIles/:id').get(downloadCompanyFIles);
Router.route('/getApprovedCompData').get(getApprovedCompData);
Router.route('/getUnapprovedCompData').get(getUnapprovedCompData);

module.exports = Router;