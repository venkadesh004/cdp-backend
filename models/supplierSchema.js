const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    supplierID: {
        type: String,
        required: true
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
    resourceType: {
        type: String
    },
    location: {
        type: String
    },
    availability: {
        type: String
    },
    rating: {
        type: Number
    },
    comments: {
        type: Array
    },
    status: {
        type: Array
    }
});

const SupplierSchema = mongoose.model("SupplierSchema", supplierSchema);

module.exports = SupplierSchema;