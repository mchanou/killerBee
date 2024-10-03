require("dotenv").config({path:"../../.env"});

const connectionString = process.env.DB_CONNECTION;

module.exports = connectionString;
