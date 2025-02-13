const mysql = require('mysql2');
const myConnection = require('express-myconnection');
const dotenv = require('dotenv');

dotenv.config();

const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
};

module.exports = (app) => {
    app.use(myConnection(mysql, dbOptions, 'single'));
};