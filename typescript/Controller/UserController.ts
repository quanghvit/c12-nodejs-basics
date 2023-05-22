import { HTTP_STATUS } from "../Config/Config";
import { fakeUserData } from "../fakeData/user";

export const handleUser = (request: any, response: any) => {
    const { method } = request;
    if (method === 'GET') {
        response.writeHead(HTTP_STATUS.SUCCESS, { 'Content-Type': 'application/json' });
        return response.end(JSON.stringify(fakeUserData));
    }

    response.writeHead(HTTP_STATUS.BAD_REQUEST, { 'Content-Type': 'application/json' });
    return response.end('Method not support');
}