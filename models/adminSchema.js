const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const AdminSchema = mongoose.model("AdminSchema", adminSchema);

module.exports = AdminSchema;