const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase');


// Define a schema for the User collection
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // 'Password' should be lowercase 'password'
    age: { type: Number, required: true }
});

// Export the model based on the schema
module.exports = mongoose.model("User", userSchema); // Capitalize the model name to follow convention
