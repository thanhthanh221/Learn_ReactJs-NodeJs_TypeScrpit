import { Request, Response, NextFunction } from "express";
import RegsiterDto from "./dtos/register.dto";
import UserService from "./users.service";

export default class UsersController {
    private userService = new UserService();
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegsiterDto = req.body;
            const tokenData = await this.userService.createUser(model);
            res.status(201).json(tokenData);
        } catch (error) {
            next(error);
        }
    }
}