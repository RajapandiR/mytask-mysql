import db from '../db/db';
import { JWT } from '../helpers/jwt';
import { Request, Response, Utils, uuidv4, Responder } from '../helpers/paths';
class AuthController {

    createUser = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const user = await Utils.getUserDetail(data.email);
            if (user) return Responder.sendFailureMessage("Already Exist", res)
            const insert = await db.query('INSERT INTO users (id, email, password) values(?, ? ,? )', [uuidv4(), data.email, await Utils.hashPassword(data.password)])
            if (insert) Responder.sendSuccessMessage("User Created", res)
            else return Responder.sendFailureMessage("Unable create user", res)
        } catch (err: any) {
            return Responder.sendFailureMessage(err.message, res)
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const user: any = await Utils.getUserDetail(data.email);
            
            if (!user) Responder.sendFailureMessage("User Not found", res)
            const vaildPwd = await Utils.comparePassword(data.password, user.password)
            if (!vaildPwd) return Responder.sendFailureMessage("Invalid credential", res)
            const token = await JWT.issueToken({ id: user.id });
            Responder.sendSuccessDataMessage({ token }, "Login successful", res)
        } catch (err:any) {
            return Responder.sendFailureMessage(err.message, res)
        }
    }
}

export const Controller = new AuthController();