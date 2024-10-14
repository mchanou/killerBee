import axios from 'axios';
import { useEffect, useState } from 'react';

function Test() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Remplace 'http://localhost:5000/users' par l'URL de ton serveur Node.js
        axios.get('http://localhost:5000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            });
    }, []);

    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Test;
