import { join } from 'path';
import { readFileSync } from 'fs';
import { IUser } from 'interfaces/user.interface';
import { NextFunction, Request, Response } from "express";

export const IdValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) throw 'ID cannot be empty.';

        // read data from users.json file
        const usersFileData = readFileSync(join(__dirname, '../_data/user.json'), 'utf8');

        // parse file data to JS object
        const usersList: IUser[] = JSON.parse(usersFileData);

        const userIdsList = usersList.map(user => user.user_id);

        if (userIdsList.some(userId => userId === id)) {
            next()
        } else {
            res.status(404).send({ error: `User with ID=${id} not found.` });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
}
