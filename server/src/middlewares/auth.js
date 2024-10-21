require("dotenv").config({ path: "../../.env" });
const sha512 = require('js-sha512')

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
    username: process.env.AD_USERNAME,
    password: process.env.AD_PASSWORD
};

console.log("Active Directory configuration:", config);

const ad = new ActiveDirectory(config);

// Route to authenticate a user
router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        console.error("Username and password are required.");
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    if(username === process.env.USER1 && password === process.env.PASS1){
        console.log("Authenticated successfully");
        return res.status(200).json({ message: 'Authenticated successfully', username: username });
    }
    else if(username === process.env.USER2 && password === process.env.PASS2){
        console.log("Authenticated successfully");
        return res.status(200).json({ message: 'Authenticated successfully', username: username });
    }
    else{
        console.error("Invalid username or password.");
        return res.status(401).json({ message: 'Authentication failed. Invalid username or password.', username: username });
    }

    // const userPrincipalName = `${username}@${process.env.AD_DN}`;

    // ad.authenticate(userPrincipalName, password, (err, auth) => {
    //     if (err) {
    //         console.error('Authentication failed:', err);
    //         return res.status(500).json({ message: 'Authentication failed. Please check the credentials and try again.' });
    //     }

    //     if (auth) {
    //         console.log("Authenticated successfully");
    //         return res.status(200).json({ message: 'Authenticated successfully' });
    //     } else {
    //         console.error("Invalid username or password.");
    //         return res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
    //     }
    // });

});

module.exports = router;
