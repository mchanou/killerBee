const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour mettre à jour un utilisateur par ID
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { PrenomUser, NomUser, EmailUser, LastConnexion, DateCreation } = req.body;

    // Vérification de la validité de l'ID
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: 'ID utilisateur invalide.' });
    }

    // Validation des données
    if (!PrenomUser || !NomUser || !EmailUser) {
        return res.status(400).json({ message: 'Les champs PrenomUser, NomUser et EmailUser sont obligatoires.' });
    }

    // Vérification et conversion des dates si elles sont fournies
    let lastConnexion = null;
    let creationDate = null;
    try {
        if (LastConnexion) {
            lastConnexion = new Date(LastConnexion);
        }
        if (DateCreation) {
            creationDate = new Date(DateCreation);
        }
    } catch (error) {
        return res.status(400).json({ message: 'Format de date invalide.' });
    }

    // Vérifier si l'utilisateur existe
    const queryCheck = `SELECT * FROM Utilisateur WHERE IdUser = ?`;

    sql.query(connectionString, queryCheck, [userId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur.' });
        }

        // Vérification si l'utilisateur n'existe pas
        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Si l'utilisateur existe, procéder à la mise à jour
        const queryUpdate = `UPDATE Utilisateur SET PrenomUser = ?, NomUser = ?, EmailUser = ?, LastConnexion = ?, DateCreation = ? WHERE IdUser = ?`;
        const params = [PrenomUser, NomUser, EmailUser, lastConnexion, creationDate, userId];


        
        TODO : "It's possible to update the informations but I need to fix the following error messages code";
        sql.query(connectionString, queryUpdate, params, (err, result) => {
            if (err) {
                console.error("Erreur lors de la mise à jour de l'utilisateur : ", err);
                return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
            }
        });

        sql.query(connectionString, queryCheck, params, (err, result) => {
             // Vérification si le résultat est valide
         if (!result || result.length === 0) {
            return res.status(500).json({ message: 'Aucune information sur l\'affectation des lignes n\'a été renvoyée.' });
        }

        // Vérification si l'utilisateur a été mis à jour
        if (result.length === 0) {
            return res.status(404).json({ message: 'Échec de la mise à jour de l\'utilisateur.' });
        }

        res.json({ message: 'Utilisateur mis à jour avec succès.' });
        })
    });
});

module.exports = router;
