const express = require('express');
const Router = express.Router();

const { getCompany, addCompany, getSuppliers, addComment, addRating, sendRequest, contractComplete, downloadFiles, downloadCompanyFile } = require("../controllers/companyControllers");

Router.route('/getCompany').post(getCompany);
Router.route('/addCompany').post(addCompany);
Router.route('/getSuppliers').get(getSuppliers);
Router.route('/addComment').put(addComment);
Router.route('/addRating').put(addRating);
Router.route('/sendRequest').put(sendRequest);
Router.route('/contractComplete').put(contractComplete);
Router.route('/downloadFiles').post(downloadFiles);
Router.route('/downloadCompanyFile').post(downloadCompanyFile);

module.exports = Router;