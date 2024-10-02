import logo from './logo.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  const [users, setUsers] = useState([]);
  const [procedes, setProcedes] = useState([]);
  const [ingredients, setIngredient] = useState([]);
  const [freezbes, setFreezbe] = useState([]);


  useEffect(() => {
      // Utiliser la route '/users' pour récupérer les utilisateurs
      axios.get('http://localhost:5000/api/users')
          .then(response => {
              setUsers(response.data);
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des utilisateurs:', error);
          });
  }, []);  


  useEffect(() => {
      // Utiliser la route '/users' pour récupérer les utilisateurs
      axios.get('http://localhost:5000/api/procede')
          .then(response => {
            setProcedes(response.data);
          })
          .catch(error => {
              console.error('Erreur lors de la récupération des utilisateurs:', error);
          });
  }, []);  
  
  useEffect(() => {
    // Utiliser la route '/users' pour récupérer les utilisateurs
    axios.get('http://localhost:5000/api/ingredient')
        .then(response => {
            setIngredient(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        });
}, []);  

useEffect(() => {
    // Utiliser la route '/users' pour récupérer les utilisateurs
    axios.get('http://localhost:5000/api/freezbe')
        .then(response => {
            setFreezbe(response.data);
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
                  <li key={index}> {user.PrenomUser} {user.NomUser} {user.EmailUser}</li>
              ))}
          </ul>

          <h1>Liste des procede</h1>
          <ul>
              {procedes.map((procede, index) => (
                  <li key={index}> {procede.NomProcede} | {procede.DescriptionProcede} | {procede.ValidationTest}</li>
              ))}
          </ul>

          <h1>Liste des ingredient</h1>
          <ul>
              {ingredients.map((ingredient, index) => (
                  <li key={index}> {ingredient.NomIngredient} | {ingredient.DescriptionIngredient}</li>
              ))}
          </ul>

          <h1>Liste des Freezbe</h1>
          <ul>
              {freezbes.map((freezbe, index) => (
                  <li key={index}> {freezbe.NomFreezbe} | {freezbe.DescriptionFreezbe} | {freezbe.PrixUHTFreezbe}</li>
              ))}
          </ul>

      </div>
  );
}

export default App;