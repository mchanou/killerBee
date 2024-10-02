const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8'); 

// Route pour supprimer un Freezbe par ID
router.delete('/:id', (req, res) => {
    const freezbeId = parseInt(req.params.id, 10);

    // Vérification de la validité de l'ID
    if (isNaN(freezbeId) || freezbeId <= 0) {
        return res.status(400).json({ message: 'ID de Freezbe invalide.' });
    }

    const query = `DELETE FROM dbo.Freezbe WHERE IdFreezbe = ?`;

    sql.query(connectionString, query, [freezbeId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du Freezbe : ", err);
            return res.status(500).json({ message: 'Erreur lors de la suppression du Freezbe.' });
        }

        // if (result.rowsAffected[0] === 0) {
        //     return res.status(404).json({ message: 'Freezbe non trouvé.' });
        // }

        res.json({ message: 'Freezbe supprimé avec succès.' });
    });
});

module.exports = router;

