//Conectarse a la base de datos de postgres

import pg from 'pg';

export const pool = new pg.Pool ({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'RecursosHumanos'
});

pool.on('connect', () => {
    console.log('Base de datos conectada')
});