import db from "../db/db";
import { JWT } from "../helpers/jwt";
import { NextFunction, Request, Responder, Response, Utils } from "../helpers/paths";

class MiddlewareClass {

    authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        const { authorization }: any = req.headers;
        if (!authorization) return Responder.sendUnauthMessage("Unauth", res)
        const { id }: any = JWT.verifyToken(authorization.split(" ")[1]);
        const [user]: any = await db.query('SELECT * FROM users WHERE id = ?', id);
        if (!user[0]) Responder.sendFailureMessage("User Not found", res)
        next()
    }


}

export const Middleware = new MiddlewareClass(); 