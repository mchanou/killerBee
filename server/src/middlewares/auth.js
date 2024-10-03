const ActiveDirectory = require('activedirectory2');
const express = require('express');
const router = express.Router();
require("dotenv").config({path:"../../.env"});

const config = {
    url: process.env.AD_URL, // LDAP URL`
    baseDN: `dc=${process.env.AD_DN},dc=com`, // DN
    username: process.env.AD_USERNAME, // Usename (optional)
    password: process.env.AD_USERNAME // Password (optiona)
};

// username and password are optional but necessary.

const ad = new ActiveDirectory(config);

// Route to authenticate a user
router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Build the user's distinguished name (DN) for authentication
    const userPrincipalName = `${username}@${process.env.AD_DN}`; 

    // Authenticate user with Active Directory
    ad.authenticate(userPrincipalName, password, (err, auth) => {
        if (err) {
            console.error('Authentication failed:', err);
            return res.status(500).json({ message: 'Authentication failed. Please check the credentials and try again.' });
        }

        if (auth) {
            return res.status(200).json({ message: 'Authenticated successfully' });
        } else {
            return res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
        }
    });
});

module.exports = router;

