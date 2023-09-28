const mongoose = require('mongoose');

/**
 * 
 * SupplierID: It is an ID that can be used to find whether the user is approved by the Admin or not.
 * 
 * Name: It is the name of the supplier who is going to register.
 * 
 * Email: It is the email of the supplier and it is primary for every user.
 * 
 * Phone: It is the phone of the supplier.
 * 
 * Password: It is their private password that is been with the user.
 * 
 * resourceType: It states whether the user is providing material or human resources, can be used for filtering.
 * 
 * location: It is location of the supplier, can be used for filtering.
 * 
 * availability: It is the current status of the user. If he is available to take any contracts or not.
 * 
 * rating: It is the rating of the user provided by their customers.
 * 
 * comments: It is the array of comments about the supplier from their customers.
 * 
 * status: It the array of requests from the customer companies
 * Requested: The company Applied But Supplier Not accepted
 * OnGoing: The company Applied and the supplier accepted
 * Rejected: The company applied but the supplier rejected
 * Completed: The company applied and supplier has completed the services
 * 
 * authorizer: It is username of the admin who approved the supplier
 * 
 * filename: it is used to store the filename of the supplier
 * 
 */

const supplierSchema = mongoose.Schema({
    supplierID: {
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
    resourceType: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    availability: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array
    },
    status: {
        type: Array
    },
    authorizer: {
        type: String,
        default: ""
    },
    filename: {
        type: String,
        default: ""
    }
});

const SupplierSchema = mongoose.model("SupplierSchema", supplierSchema);

module.exports = SupplierSchema;