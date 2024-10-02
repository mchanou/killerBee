const ActiveDirectory = require('activedirectory2');
const express = require('express');
const router = express.Router();

const config = {
    url: 'ldap://your-ldap-server.com', // Replace with your LDAP server URL
    baseDN: 'dc=yourdomain,dc=com', // Replace with your domain's base DN
    username: 'your-service-account@yourdomain.com', // Optional: Service account username if needed
    password: 'your-service-account-password' // Optional: Service account password
};

const ad = new ActiveDirectory(config);

// Route to authenticate a user
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Build the user's distinguished name (DN) for authentication
    const userPrincipalName = `${username}@yourdomain.com`; // Adjust to match your domain naming conventions

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

