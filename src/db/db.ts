import mysql from 'mysql2/promise';
import { dotenv  } from '../helpers/paths';

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

db.getConnection().then(() => console.log('Db Connected')).catch(() => console.log('Not connected'));
export default db;
