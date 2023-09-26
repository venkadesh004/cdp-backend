const express = require('express');
const Router = express.Router();

const { getSupplier, addSupplier } = require('../controllers/supplierControllers');

Router.route('/getSupplier').get(getSupplier);
Router.route('/addSupplier').post(addSupplier);

module.exports = Router;