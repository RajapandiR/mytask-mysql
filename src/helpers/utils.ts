import db from '../db/db';
import { bcrypt, Request, Response } from '../helpers/paths';
class UtilsController {

    hashPassword = async (pwd: string) => {
        return await bcrypt.hash(pwd, await bcrypt.genSalt(10))
    }

    getUserDetail = async (email: string) => {
        const [user]: any = await db.query('SELECT * FROM users WHERE email = ?', email);
        return user[0];
    }

    comparePassword = async (pwd: string, hashPassword: string) => {
        console.log(pwd, hashPassword);

        return await bcrypt.compare(pwd, hashPassword);
    }
}

export const Utils = new UtilsController();