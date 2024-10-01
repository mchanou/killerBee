const connection = require('../../config/database');
const express = require('express');
const router = express.Router();

const sql = require('msnodesqlv8');

const query = "SELECT * FROM Utilisateur";

//

// Exemple de données statiques pour les utilisateurs
const users =  sql.query(connection, query, (err, rows) => {
         if (err) {
             console.error("Erreur lors de l'exécution de la requête : ", err);
             return;
         }
        //  console.log(rows);

        if (Array.isArray(rows)) {
            const usersList = rows.map(user => {
                return {
                    prenom: user.PrenomUser,
                    nom: user.NomUser,
                    email: user.EmailUser,
                    derniereConnexion: user.LastConnexion,
                    dateCreation: user.DateCreation
                };
            });
            
            console.log(usersList);
            
            // Route pour obtenir tous les utilisateurs
            router.get('/', (req, res) => {
                res.json(usersList);
            });
        } else {
            console.log('users n\'est pas un tableau');
        }    
     });

// Route pour obtenir un utilisateur par ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
});

// Route pour créer un nouvel utilisateur
router.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Route pour mettre à jour un utilisateur par ID
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
});

// Route pour supprimer un utilisateur par ID
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: 'Utilisateur supprimé' });
    } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
});

module.exports = router;
