import { join } from 'path';
import { genHexId } from '../helpers';
import { Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { IUser } from 'interfaces/user.interface';

const USER_FILE_PATH = join(__dirname, '../_data/user.json');

export class UserController {

    addNewUser(req: Request, res: Response) {
        try {
            const {
                email,
                name,
                given_name,
                family_name,
                nickname,
            } = req.body;
    
            // create new user object
            const newUser: IUser = {
                user_id: genHexId(),
                email,
                name,
                given_name,
                family_name,
                nickname,
                last_ip: null,
                logins_count: 0,
                created_at: new Date().toISOString(),
                updated_at: null,
                last_login: null,
                email_verified: false,
            };

            // TODO: use fs-extra's methods to handle JSON
            // instead of using readFile & writeFile
    
            // read _data/users.json file to get users data
            const usersFileData = readFileSync(USER_FILE_PATH, 'utf8');
    
            // parse file data to JS object
            let usersList: IUser[] = JSON.parse(usersFileData);
    
            // add new user to users list
            usersList.unshift(newUser);
    
            // parse users list to string
            const usersJsonStr = JSON.stringify(usersList, null, 2);
    
            // write users data to file
            writeFileSync(USER_FILE_PATH, usersJsonStr, 'utf8');
    
            return res.status(201).json({ data: newUser });
        } catch (error) {
            res.status(500).send({ error });
        }
    }

    getUsers(req: Request, res: Response) {
        try {
            // read _data/users.json file to get users data
            const usersFileData = readFileSync(USER_FILE_PATH, 'utf8');
    
            // parse file data to JS object
            let usersList: IUser[] = JSON.parse(usersFileData);

            return res.status(200).json({
                total: usersList.length,
                data: usersList
            });
        } catch (error) {
            res.status(500).send({ error });
        }
    }

    getUserWithID(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // read _data/users.json file to get users data
            const usersFileData = readFileSync(USER_FILE_PATH, 'utf8');
    
            // parse file data to JS object
            let usersList: IUser[] = JSON.parse(usersFileData);

            // find user with id
            const user = usersList.find(user => user.user_id === id);

            return res.status(200).json({ data: user });
        } catch (error) {
            res.status(500).send({ error });
        }
    }

    updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                email,
                name,
                given_name,
                family_name,
                nickname,
            } = req.body;

            // read _data/users.json file to get users data
            const usersFileData = readFileSync(USER_FILE_PATH, 'utf8');
    
            // parse file data to JS object
            let usersList: IUser[] = JSON.parse(usersFileData);

            // find and update user
            usersList = usersList.map(user => {
                if (user.user_id === id) {
                    return {
                        ...user,
                        email,
                        name,
                        given_name,
                        family_name,
                        nickname,
                        updated_at: new Date().toISOString(),
                    }
                }
                return user;
            });
    
            // parse users list to string
            const usersJsonStr = JSON.stringify(usersList, null, 2);
    
            // write users data to file
            writeFileSync(USER_FILE_PATH, usersJsonStr, 'utf8');

            return res.status(200).json({ updated: true });
        } catch (error) {
            res.status(500).send({ error });
        }
    }

    deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // read _data/users.json file to get users data
            const usersFileData = readFileSync(USER_FILE_PATH, 'utf8');
    
            // parse file data to JS object
            let usersList: IUser[] = JSON.parse(usersFileData);

            // find and remove user
            usersList = usersList
                .map(user => {
                    if (user.user_id === id) {
                        return null as any as IUser;
                    }
                    return user;
                })
                .filter(user => !!user);
    
            // parse users list to string
            const usersJsonStr = JSON.stringify(usersList, null, 2);
    
            // write users data to file
            writeFileSync(USER_FILE_PATH, usersJsonStr, 'utf8');

            return res.status(200).json({ deleted: true });
        } catch (error) {
            res.status(500).send({ error });
        }
    }
}
