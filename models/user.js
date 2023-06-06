const mongoose = require('../db/mongo');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = UserSchema;