import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('KillerBee', 'NEXTGEN\/2113136', '', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    },
});

export default sequelize;