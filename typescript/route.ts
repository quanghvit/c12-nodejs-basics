import { HTTP_STATUS } from "./Config/Config";
import { handleUser } from "./Controller/UserController";

export const forWardRouter = (request: any, response: any) => {
    const { url } = request;
    if (url?.toString()?.startsWith('/users')) {
        return handleUser(request, response);
    }

    response.writeHead(HTTP_STATUS.NOT_FOUND, { 'Content-Type': 'application/json' });
    response.end('Page Not found');
}