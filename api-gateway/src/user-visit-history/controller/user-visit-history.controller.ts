import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import UserVisitHistoryService from '../service/user-visit-history.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user/visits')
export class UserVisitHistoryController {
    constructor(private readonly userVisitHistoryService: UserVisitHistoryService) { }

    @Get()
    async getVisitHistory(@Req() req) {
        return this.userVisitHistoryService.getVisitHistory(req.user.id);
    }
}
