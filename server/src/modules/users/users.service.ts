import { isEmptyObject } from '@core/utils';
import { DataStoredInToken, TokenData } from '../auth/auth.interface';
import RegsiterDto from './dtos/register.dto';
import UserSchema from './user.model';
import { HttpException } from '@core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './users.interface';
import jwt from 'jsonwebtoken';
class UserService {
    public userSchema = UserSchema;

    public async createUser(model: RegsiterDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, "Model is empty")
        }

        const user = await this.userSchema.findOne({ email: model.email });

        if (user) {
            throw new HttpException(409, `Email: ${model.email} đã tồn tại`)
        }

        const avatar = gravatar.url(model.email!, {
            size: '200',
            rating: 'pg',
            default: 'mm'
        });

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(model.password!, salt);

        const createUser: IUser = await this.userSchema.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            date: Date.now()
        })
        return this.createToken(createUser);
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

export default UserService;