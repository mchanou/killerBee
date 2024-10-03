import './App.css';

import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tabs from './components/KbTabs.js'
import Login from './components/Login.js'
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Header from './components/Header';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };




function App() {
  const [users, setUsers] = useState([]);
  const [procedes, setProcedes] = useState([]);
  const [ingredients, setIngredient] = useState([]);
  const [freezbes, setFreezbe] = useState([]);
  const [etapes, setEtape] = useState([]);


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

useEffect(() => {
    // Utiliser la route '/users' pour récupérer les utilisateurs
    axios.get('http://localhost:5000/api/etape')
        .then(response => {
            setEtape(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
        });
}, []); 

 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Header/>}>
          <Route path="/" element={<Tabs />}></Route>
          </Route>
          </Route>
          <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
    {/* </div>
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

          <h1>Liste des Etapes</h1>
          <ul>
              {etapes.map((etape, index) => (
                  <li key={index}> {etape.DescriptionEtape}</li>
              ))}
          </ul>

      </div> */}


export default App;