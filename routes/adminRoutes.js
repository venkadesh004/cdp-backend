const express = require('express');
const Router = express.Router();

const { getAdmin, addAdmin, getUnapprovedData, getApprovedData, allowSuppliers, denySuppliers, downloadFiles } = require('../controllers/adminControllers');

Router.route('/getAdmin').post(getAdmin);
Router.route('/addAdmin').post(addAdmin);
Router.route('/getUnapprovedData').get(getUnapprovedData);
Router.route('/getApprovedData').get(getApprovedData);
Router.route('/allowSuppliers').put(allowSuppliers);
Router.route('/denySuppliers').put(denySuppliers);
Router.route('/downloadFiles').get(downloadFiles);

module.exports = Router;