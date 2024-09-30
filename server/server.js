const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes'); // Allows to import all routes

app.use(cors());
app.use(express.json());

TODO : "Create a index.js file in the route folder";
app.use('/api', routes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
