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
};

module.exports = (app) => {
    app.use(myConnection(mysql, dbOptions, 'single'));

    function keepDatabaseAlive(pool) {
        const intervalTime = 60000; // 60 segundos en lugar de 30
        let isQueryRunning = false;

        setInterval(() => {
            if (!isQueryRunning) {
                isQueryRunning = true;
                pool.query('SELECT 1', (err) => {
                    isQueryRunning = false;
                    if (err) {
                        console.error('Error en keep-alive de la base de datos:', err);
                    } else {
                        console.log('Keep-alive: conexión con la base de datos verificada');
                    }
                });
            }
        }, intervalTime);
    }

    const pool = mysql.createPool(dbOptions);
    keepDatabaseAlive(pool);
};

module.exports.keepDatabaseAlive = this.keepDatabaseAlive;