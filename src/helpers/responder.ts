import db from '../db/db';
import { bcrypt, Request, Response } from '../helpers/paths';

interface successMsg {
    success: boolean,
    message: string
}

interface successDataMsg {
    success: boolean,
    message: string,
    data: any
}

interface failureMsg {
    success: boolean,
    message: string
}

class ResponderController {

    sendSuccessMessage = (msg: string, res: Response) => {
        let result: successMsg = {
            success: true,
            message: msg
        }
        res.header('content-type', 'application/json');
        res.end(JSON.stringify(result))
    }

    sendFailureMessage = (msg: string, res: Response) => {
        let result: failureMsg = {
            success: false,
            message: msg
        }
        res.header('content-type', 'application/json');
        res.end(JSON.stringify(result))
    }

    sendSuccessDataMessage = (data: any, msg: string, res: Response) => {
        let result: successDataMsg = {
            success: true,
            message: msg,
            data: data
        }
        res.header('content-type', 'application/json');
        res.end(JSON.stringify(result))
    }

    sendUnauthMessage = (msg: string, res: Response) => {
        let result: failureMsg = {
            success: false,
            message: msg,
        }
        res.header('content-type', 'application/json');
        res.status(401).end(JSON.stringify(result))
    }
}

export const Responder = new ResponderController();