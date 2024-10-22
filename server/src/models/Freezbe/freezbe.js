const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');
const {URL} = require('url')

// Route pour obtenir tous les Freezbes
router.get('/', (req, res) => {
const myURL = new URL(req.url, `http://${req.headers.host}`)
const searchParams = myURL.searchParams;
let NomFreezbe = searchParams.get('NomFreezbe')
let GammeFreezbe = searchParams.get('GammeFreezbe')
let column = searchParams.get('column')
let direction = searchParams.get('direction')


    if(NomFreezbe != null && GammeFreezbe != null && column != null && direction != null){
        const query = `SELECT * FROM Freezbe WHERE NomFreezbe LIKE '%${NomFreezbe}%' AND GammeFreezbe LIKE '%${GammeFreezbe}%' ORDER BY ${column + ' ' + direction}`;

        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.error("Erreur lors de la récupération des Freezbes : ", err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des Freezbes' });
            }
            res.json(rows);
        });
    }
    else{
        const query = `SELECT * FROM Freezbe`;
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.error("Erreur lors de la récupération des Freezbes : ", err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des Freezbes' });
            }
            res.json(rows);
        });
    }

    
});

module.exports = router;
