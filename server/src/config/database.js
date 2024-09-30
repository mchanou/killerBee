const sql = require('msnodesqlv8');

const connectionString = "server=NR-CISCO-20\\MSSQLSERVER01;Database=KillerBee;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server};";
const query = "SELECT * FROM Utilisateur";

sql.query(connectionString, query, (err, rows) => {
    if (err) {
        console.error("Erreur lors de l'exécution de la requête : ", err);
        return;
    }
    console.log(rows);
});
