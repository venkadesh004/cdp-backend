const mongoose = require('mongoose');

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
    }
});

const SupplierSchema = mongoose.model("SupplierSchema", supplierSchema);

module.exports = SupplierSchema;