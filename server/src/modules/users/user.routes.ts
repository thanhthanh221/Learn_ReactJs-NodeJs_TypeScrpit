import { Router } from "express";
import { Route } from "@core/interfaces";
import UsersController from "./users.controller";
import { validationMiddleware } from "@core/middleware";
import RegsiterDto from "./dtos/register.dto";

export default class UsersRoute implements Route {
    public path = "/api/users";
    public router = Router();

    public UserController = new UsersController();

    constructor() {
        this.initializeRoutes();
    };

    private initializeRoutes() {
        this.router.post(this.path,
            validationMiddleware(RegsiterDto, true),
            this.UserController.register
        ); // POST  
    }
}