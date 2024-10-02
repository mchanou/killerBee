const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8'); 

// Route to remove a procédé by ID
router.delete('/:id', (req, res) => {
    const procedeId = parseInt(req.params.id, 10);

    // Validate the ID
    if (isNaN(procedeId) || procedeId <= 0) {
        return res.status(400).json({ message: 'ID de procédé invalide.' });
    }

    const query = `DELETE FROM dbo.Procede WHERE IdProcede = ?`;

    sql.query(connectionString, query, [procedeId], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du procédé : ", err);
            return res.status(500).json({ message: 'Erreur lors de la suppression du procédé.' });
        }

        // Check if the procédé was found and deleted
        // if (result.rowsAffected[0] === 0) {
        //     return res.status(404).json({ message: 'Procédé non trouvé.' });
        // }

        res.json({ message: 'Procédé supprimé avec succès.' });
    });
});

module.exports = router;
