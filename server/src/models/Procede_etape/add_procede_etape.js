const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter une relation Procédé-Étape
router.post('/', (req, res) => {
    let { IdProcede, IdEtape, NumEtape } = req.body;

    // Validation des données
    if (!IdProcede || !IdEtape || NumEtape === undefined) {
        return res.status(400).json({ message: 'Les champs et NumEtape sont obligatoires.' });
    }

    const query = `INSERT INTO dbo.Procede_etape (IdProcede, IdEtape, NumEtape) VALUES (?, ?, ?)`;
    const params = [IdProcede, IdEtape, NumEtape];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de la relation Procédé-Étape : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de la relation Procédé-Étape.' });
        }
        res.status(201).json({ message: 'Relation Procédé-Étape ajoutée avec succès.', procedeEtapeId: result.insertId });
    });
});

module.exports = router;

