const connection = require('../config/database');

const sql = require('msnodesqlv8');

const query = "SELECT * FROM Utilisateur";

sql.query(connection, query, (err, rows) => {
    if (err) {
        console.error("Erreur lors de l'exécution de la requête : ", err);
        return;
    }
    console.log(rows);
});