import { JwtPayload } from '@ecommerce/types';
import { Request } from 'express';

export interface RequestWithUser extends Request {
    user: JwtPayload;
}
