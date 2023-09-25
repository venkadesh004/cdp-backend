const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyID: {
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
    status: {
        type: Array
    }
});

const CompanySchema = mongoose.model("CompanySchema", companySchema);

module.exports = CompanySchema;