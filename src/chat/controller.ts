import fs from 'fs';
import db from '../db/db';
import { JWT } from '../helpers/jwt';
import {
    Request, Response, Utils, uuidv4, Responder, csv
} from '../helpers/paths';
class AuthController {

    importData = async (req: Request, res: Response) => {
        try {
            const file: any = req.file?.path;
            fs.createReadStream(process.cwd() + "/" + file)
                .pipe(csv.parse({ headers: true }))
                .on("data", async (row) => {
                    await db.query('INSERT INTO chat (id, name, msg) values(?, ? ,? )', [uuidv4(), row["name"], row["msg"]])
                })
                .on("end", () => {
                    fs.unlink(file, () => { })
                    Responder.sendSuccessMessage("Import Date", res)
                })
        } catch (err: any) {
            return Responder.sendFailureMessage(err.message, res)
        }
    }


    getChats = async (req: Request, res: Response) => {
        try {

            var query: any = req.query;
            var status: string, where: any;

            // var dbQuery: any = " SELECT * FROM chat";
            // if (query.status) {
            //     status = query.status;
            //     where = ` WHERE status=${query.status}`;
            //     dbQuery = dbQuery + where;
            // }
            // console.log(dbQuery);
            var dbQuery = 'SELECT * from `chat` WHERE 1=1 ';
            if (query.status) {
                dbQuery += 'AND `status` = '+ db.escape(query.status);
            }
            const [chats] = await db.query(dbQuery);
            if (chats) Responder.sendSuccessDataMessage(chats, "chats", res)
            else return Responder.sendFailureMessage("Unable  get chats", res)
        } catch (err: any) {
            console.log(err);

            return Responder.sendFailureMessage(err.message, res)
        }
    }
}

export const Controller = new AuthController();