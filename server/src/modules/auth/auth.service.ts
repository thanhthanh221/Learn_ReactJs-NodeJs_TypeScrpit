import { isEmptyObject } from '@core/utils';
import { DataStoredInToken, TokenData } from '../auth/auth.interface';
import { HttpException } from '@core/exceptions';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginDto from './auth.dto';
import IUser from '@modules/users/users.interface';
import { UserSchema } from '@modules/users';

class AuthService {
    public userSchema = UserSchema

    public async login(model: LoginDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty")
        }
        const user = await this.userSchema.findOne({ email: model.email }).exec();
        if (!user) {
            throw new HttpException(409, `Email: ${model.email} không tồn tại`)
        }
        const isMatchPassword = await bcryptjs.compare(model.password, user.password);
        if (!isMatchPassword) {
            throw new HttpException(400, "Mật khẩu không chính xác");
        }

        return this.createToken(user);
    }
    public async getCurrentLoginUser(userId: string): Promise<IUser> {
        const user = await this.userSchema.findById(userId);
        if (!user) {
            throw new HttpException(404, `User không tồn tại`)
        }
        return user;
    }
    private createToken(user: IUser): TokenData {
        const dataInToken: DataStoredInToken = { id: user._id };
        const secret: string = process.env.JWT_TOKEN_SECRET!;
        const expiresIn: number = 60;
        return {
            token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
        }
    }
};

export default AuthService;