const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');
const {URL} = require('url')

// Route pour obtenir tous les procédés
router.get('/', (req, res) => {
    const myURL = new URL(req.url, `http://${req.headers.host}`)
    const searchParams = myURL.searchParams;
    let NomProcede = searchParams.get('NomProcede');
    let column = searchParams.get('column')
    let direction = searchParams.get('direction')

    const query = `SELECT * FROM Procede WHERE NomProcede LIKE '%${NomProcede}%' ORDER BY ${column + ' ' + direction}`;
    

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération des procédés : ", err);
            return res.status(500).json({ message: 'Erreur lors de la récupération des procédés' });
        }
        res.json(rows);
    });
});

module.exports = router;
