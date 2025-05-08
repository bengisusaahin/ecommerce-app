import { Request } from 'express';
import { User } from 'src/users/entity/user.entity';

export interface RequestWithUser extends Request {
    user: User;
}
