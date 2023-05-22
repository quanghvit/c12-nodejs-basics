import { Request, Response, Application } from "express";
import { UserController } from "../controllers/user.controller";
import { IdValidation } from "../middlewares/idValidation.middleware";

export class Routes {

    public userController: UserController = new UserController()

    public routes(app: Application): void {

        // Default routes
        app.route('/')
            .get((req: Request, res: Response) => res.status(200).send({ message: 'Nodejs Basics'}))

        // User routes
        app.route('/users')
            .get(this.userController.getUsers)      // get users
            .post(this.userController.addNewUser)   // add new user

        // TODO: use IdValidation middleware for all '/users/:id' routes
        app.route('/users/:id')
            .get(IdValidation, this.userController.getUserWithID) // get user with id
            .put(IdValidation, this.userController.updateUser)    // update user
            .delete(IdValidation, this.userController.deleteUser) // delete user
    }
}
