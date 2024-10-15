const connectionString = require('../../config/database'); // Charger la chaîne de connexion
const express = require('express');
const router = express.Router();
const sql = require('msnodesqlv8');

// Route pour ajouter un procédé
router.post('/', (req, res) => {
    let { NomProcede, DescriptionProcede, ValidationTest, IdFreezbe, StepsList } = req.body;

    // Validation des données
    if (!NomProcede || !DescriptionProcede || ValidationTest === undefined || !IdFreezbe || !Array.isArray(StepsList)) {
        return res.status(400).json({ message: 'Des champs sont manquants.' });
    }
    
    const query = `INSERT INTO dbo.Procede (NomProcede, DescriptionProcede, ValidationTest, IdFreezbe) VALUES (?, ?, ?, ?)`;
    const params = [NomProcede, DescriptionProcede, ValidationTest, IdFreezbe];

    sql.query(connectionString, query, params, (err) => {
        if (err) {
            console.error("Erreur lors de l'insertion du procédé : ", err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du procédé.' });
        }
        const getIdQuery = `SELECT IDENT_CURRENT('Procede') AS Id;`
        sql.query(connectionString, getIdQuery, (err, result)=>{
            if (err) {
                console.error("Erreur lors de la récupération de l'ID : ", err);
                return res.status(500).json({ message: 'Erreur lors de la récupération de l\'ID du Freezbe.' });
            }
            console.log("Insert Result: " + JSON.stringify(result))
            let IdProcede = null;
            if (result && result.recordset && result.recordset.length > 0) {
                IdProcede = result.recordset[0].Id;
            }else{
                IdProcede = result[0].Id;
            }
            console.log("IdProcede: ", IdProcede);
        
            if (!IdProcede || IdProcede === null || IdProcede === undefined) {
                console.error("IdFreezbe est undefined ou null");
            }
            
            const query2 = `INSERT INTO dbo.Etape (DescriptionEtape, NumEtape, IdProcede) VALUES `
            console.log(StepsList)
            const values = StepsList.map(obj => `('${obj.stepDesc}', ${obj.stepNumber}, ${IdProcede})`).join(', ');
            
            if (values.length === 0) {
                console.error("No valid steps to insert.");
            }
    
            const finalQuery = query2 + values
           console.log("Final query "+finalQuery)
            sql.query(connectionString, finalQuery, (err)=>{
                if(err){
                    console.error("Erreur lors de l'insertion des étapes : ", err);
                    return res.status(500).json({ message: 'Erreur lors de l\'ajout des étapes.' });
                }
                res.status(200).json({ message: 'Procédé et ses étapes ajouté avec succès.' });
            })
        })


        
    });
});

module.exports = router;