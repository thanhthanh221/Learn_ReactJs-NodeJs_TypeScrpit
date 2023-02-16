import { Router } from "express";
import { Route } from "@core/interfaces";
import { validationMiddleware } from "@core/middleware";
import AuthController from './auth.controller';

export default class AuthRoute implements Route {
    public path = "/api/auth";
    public router = Router();

    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    };

    private initializeRoutes() {
        this.router.post(this.path, this.authController.login); // POST  
    }
}