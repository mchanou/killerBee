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

  return (
      <div>
          <h1>Liste des utilisateurs</h1>
          <ul>
              {users.map((user, index) => (
                  <li key={index}>{user.PrenomUser}</li>
              ))}
          </ul>
      </div>
  );
}

export default App;