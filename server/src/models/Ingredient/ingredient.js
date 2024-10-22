const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');
const {URL} = require('url')

// Route pour obtenir tous les ingrédients
router.get('/', (req, res) => {
    const myURL = new URL(req.url, `http://${req.headers.host}`)
    const searchParams = myURL.searchParams;
    let NomIngredient = searchParams.get('NomIngredient')
    let column = searchParams.get('column')
    let direction = searchParams.get('direction')

    if(NomIngredient != null && column != null && direction != null){
        const query = `SELECT * FROM Ingredient WHERE NomIngredient LIKE '%${NomIngredient}%' ORDER BY ${column + ' ' + direction}`;

        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.error("Erreur lors de la récupération des ingrédients : ", err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des ingrédients' });
            }
            res.json(rows);
        });
    }
    else{
        const query = `SELECT * FROM Ingredient`

        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.error("Erreur lors de la récupération des ingrédients : ", err);
                return res.status(500).json({ message: 'Erreur lors de la récupération des ingrédients' });
            }
            res.json(rows);
        });
    }
    
});

module.exports = router;
