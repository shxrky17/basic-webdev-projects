const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Render the index page
app.get("/", (req, res) => {
    res.render("index");
});

// Handle user creation
app.post("/create", async (req, res) => {
    let { username, email, password, age } = req.body;

    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create the user
        let createdUser = await userModel.create({
            username,
            email,
            password: hash, // Use the hashed password
            age
        });

        // Generate a JWT token
        let token = jwt.sign({ email }, "your_jwt_secret_key"); // Replace with your actual JWT secret

        // Set the token in a cookie
        res.cookie("token", token);

        // Send the created user
        res.status(201).send(createdUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

// Render the login page
app.get("/login", (req, res) => {
    res.render("login");
});

// Handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await userModel.findOne({ email });

        // Check if the user exists
        if (!user) return res.status(404).send("User not found");

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error logging in');
            }

            // Check if the password matches
            if (result) {
                // Password is correct
                res.send("Login successful");
            } else {
                // Password is incorrect
                res.status(401).send('Invalid credentials');
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }

    console.log(user.password, password);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
