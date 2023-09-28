const mongoose = require('mongoose');

/**
 * 
 * username: It is the username of the admin through which the admin will log into the portal
 * 
 * password: It is the password of the admin
 * 
 */

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