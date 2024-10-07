require("dotenv").config({ path: "../../.env" });

// Check if environment variables are loaded
if (!process.env.AD_URL || !process.env.AD_DN || !process.env.AD_USERNAME || !process.env.AD_PASSWORD) {
    console.error("Missing environment variables. Please check the .env file.");
    process.exit(1);
}

const ActiveDirectory = require('activedirectory2');
const express = require('express');
const router = express.Router();

const config = {
    url: process.env.AD_URL,
    baseDN: `dc=${process.env.AD_DN},dc=com`,
    login: process.env.AD_USERNAME,
    password: process.env.AD_PASSWORD
};

console.log("Active Directory configuration:", config);

const ad = new ActiveDirectory(config);

// Route to authenticate a user
router.post('/', (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        console.error("Username and password are required.");
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const userPrincipalName = `${login}@${process.env.AD_DN}`;

    ad.authenticate(userPrincipalName, password, (err, auth) => {
        if (err) {
            console.error('Authentication failed:', err);
            return res.status(500).json({ message: 'Authentication failed. Please check the credentials and try again.' });
        }

        if (auth) {
            console.log("Authenticated successfully");
            return res.status(200).json({ message: 'Authenticated successfully' });
        } else {
            console.error("Invalid login or password.");
            return res.status(401).json({ message: 'Authentication failed. Invalid login or password.' });
        }
    });
});

module.exports = router;
