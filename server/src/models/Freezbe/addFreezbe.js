const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter un Freezbe
router.post('/', (req, res) => {
    let { NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe, IngredientsList } = req.body;

    // Validation des données
    if (!NomFreezbe || !DescriptionFreezbe || PrixUHTFreezbe === undefined || !GammeFreezbe || !Array.isArray(IngredientsList)) {
        return res.status(400).json({ message: 'Les champs NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe et GammeFreezbe sont obligatoires.' });
    }
    
    const query = `
    INSERT INTO dbo.Freezbe (NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe) VALUES (?, ?, ?, ?);`;

    const params = [NomFreezbe, DescriptionFreezbe, PrixUHTFreezbe, GammeFreezbe];

    sql.query(connectionString, query, params, (err) => {
        if (err) {
            console.error("Erreur lors de l'insertion du Freezbe : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du Freezbe.' });
        }
        
        const getIdQuery = `SELECT IDENT_CURRENT('Freezbe') AS Id;`
        sql.query(connectionString, getIdQuery, (err, result) =>{
            if (err) {
                console.error("Erreur lors de la récupération de l'ID : ", err);
                return res.status(500).json({ message: 'Erreur lors de la récupération de l\'ID du Freezbe.' });
            }
            console.log("Insert Result: " + JSON.stringify(result))
            let IdFreezbe = null;
            if (result && result.recordset && result.recordset.length > 0) {
                IdFreezbe = result.recordset[0].Id;
            }else{
                IdFreezbe = result[0].Id;
            }
            console.log("IdFreezbe: ", IdFreezbe);
        
            if (!IdFreezbe || IdFreezbe === null || IdFreezbe === undefined) {
                console.error("IdFreezbe est undefined ou null");
            }
            
            const query2 = `INSERT INTO dbo.Freezbe_ingredient (IdFreezbe, IdIngredient, Grammage) VALUES `
            console.log(IngredientsList)
            const values = IngredientsList.map(obj => `(${IdFreezbe}, ${obj.IdIngredient}, ${obj.Grammage})`).join(', ');
            
            if (values.length === 0) {
                console.error("No valid ingredients to insert.");
            }
    
            const finalQuery = query2 + values
           console.log("Final query "+finalQuery)
            sql.query(connectionString, finalQuery, (err)=>{
                if(err){
                    console.error("Erreur lors de l'insertion des ingrédients : ", err);
                    return res.status(500).json({ message: 'Erreur lors de l\'ajout des ingrédients.' });
                }
                res.status(200).json({ message: 'Freezbe et ses ingrédients ajoutés avec succès.'});
            })
        
        
        })
        

        // if (result && result.recordset && result.recordset.length > 0) {
        //     IdFreezbe = result.recordset[0].Id; // Check the common structure for SCOPE_IDENTITY
        // } else if (Array.isArray(result)) {
        //     // If it's an array, check its first element for ID
        //     if (result.length > 0 && result[0].Id) {
        //         IdFreezbe = result[0].Id; // If there's an Id in the first result object
        //     }
        // } else if (result && result.length > 0) {
        //     // Fallback: if result is an object and has length
        //     IdFreezbe = result[0].Id; // Checking the first index
        // }    
        
    });
});

module.exports = router;

