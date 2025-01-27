import jwt from "jsonwebtoken";
import 'dotenv/config'

var token: any = process.env.SECRET;
class JWTClass {

    issueToken = (payload: any) => {
        return jwt.sign(payload, token, {
            expiresIn: '4h'
        });
    }

    verifyToken = (payload: any) => {
        return jwt.verify(payload, token);
    }

}

export const JWT = new JWTClass(); 