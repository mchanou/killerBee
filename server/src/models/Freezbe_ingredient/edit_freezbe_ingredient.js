// Route pour mettre à jour une relation Freezbe-Ingredient
router.put('/:idFreezbe/:idIngredient', (req, res) => {
    const IdFreezbe = parseInt(req.params.idFreezbe, 10);
    const IdIngredient = parseInt(req.params.idIngredient, 10);
    const { Grammage } = req.body;

    // Vérification de la validité des IDs
    if (isNaN(IdFreezbe) || IdFreezbe <= 0 || isNaN(IdIngredient) || IdIngredient <= 0) {
        return res.status(400).json({ message: 'IDs du Freezbe ou Ingredient invalides.' });
    }

    // Validation des données
    if (Grammage === undefined) {
        return res.status(400).json({ message: 'Le champ Grammage est obligatoire.' });
    }

    const query = `UPDATE dbo.Freezbe_ingredient SET Grammage = ? WHERE IdFreezbe = ? AND IdIngredient = ?`;
    const params = [Grammage, IdFreezbe, IdIngredient];

    sql.query(connectionString, query, params, (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour de la relation Freezbe-Ingredient : ", err);
            return res.status(500).json({ message: 'Erreur lors de la mise à jour de la relation Freezbe-Ingredient.' });
        }

        // Vérifier le nombre de lignes affectées
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Relation Freezbe-Ingredient non trouvée.' });
        }

        res.json({ message: 'Relation Freezbe-Ingredient mise à jour avec succès.' });
    });
});

module.exports = router;

