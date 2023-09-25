const express = require('express');
const Router = express.Router();

const { getAdmin, addAdmin } = require('../controllers/adminControllers');

Router.route('/getAdmin').get(getAdmin);
Router.route('/addAdmin').post(addAdmin);

module.exports = Router;