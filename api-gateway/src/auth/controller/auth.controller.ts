import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '@ecommerce/types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post('verify')
    async verify(@Body('token') token: string) {
        return await this.authService.verify(token);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async getMe(@Request() req: RequestWithUser) {
        return this.authService.getMe(req.user.sub);
    }

}