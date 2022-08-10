import mysql from "mysql";

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b43aeb20ef4630',
    password: '4c90037f',
    database: 'heroku_9d5a2bc23e38f1b'
});