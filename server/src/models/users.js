import DataTypes from 'sequelize'

const sequelize = require('../config/database');

const User = sequelize.define('Utilisateur', {
    name: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = User;