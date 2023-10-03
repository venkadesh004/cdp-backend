const mongoose = require('mongoose');

/**
 * 
 * companyID: It is the unique ID of the company similar to supplier. It helps them to store their company Documents. It gets the value of the object ID after the company uploads its documents
 * 
 * name: It is the name of the company
 * 
 * phone: It is the phone of the company
 * 
 * password: Used to store password for company login
 * 
 * status: It is requests the company sent to the suppliers.
 * 
 * filename: Used to store the filename of the company
 * 
 * authorizer: Used to say who authorized the company
 * 
 */

const companySchema = mongoose.Schema({
    companyID: {
        type: String,
        default: "None"
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: Array
    },
    filename: {
        type: String,
        default: ""
    },
    authorizer: {
        type: String,
        default: ""
    } 
});

const CompanySchema = mongoose.model("CompanySchema", companySchema);

module.exports = CompanySchema;