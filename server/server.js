require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/index'); // Allows to import all routes

app.use(cors());
app.use(express.json());

TODO : "Create a index.js file in the route folder";
app.use('/api', routes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
