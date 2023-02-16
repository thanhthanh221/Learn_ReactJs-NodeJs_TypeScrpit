import { Request, Response, NextFunction } from "express";
import AuthService from "./auth.service";
import LoginDto from "./auth.dto";

export default class AuthController {
    private userService = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: LoginDto = req.body;
            const tokenData = await this.userService.login(model);
            res.status(200).json(tokenData);
        } catch (error) {
            next(error);
        }
    }
}