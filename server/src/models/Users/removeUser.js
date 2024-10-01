const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8'); 


// Route to remove user by ID
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const query = `DELETE FROM Utilisateur WHERE Id = ?`;

    sql.query(connectionString, query, [userId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression de l'utilisateur : ", err);
            return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
        }
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès' });
    });
});

module.exports = router;
