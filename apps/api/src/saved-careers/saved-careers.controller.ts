import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SaveCareerDto } from './dto/save-career.dto';
import { SavedCareersService } from './saved-careers.service';

@Controller('saved-careers')
@UseGuards(JwtAuthGuard)
export class SavedCareersController {
  constructor(private readonly savedCareersService: SavedCareersService) {}

  @Get()
  getSavedCareers(@CurrentUser() user: User) {
    return this.savedCareersService.getSavedCareers(user.id);
  }

  @Post()
  saveCareer(@CurrentUser() user: User, @Body() dto: SaveCareerDto) {
    return this.savedCareersService.saveCareer(user.id, dto);
  }

  @Delete(':careerId')
  unsaveCareer(@CurrentUser() user: User, @Param('careerId') careerId: string) {
    return this.savedCareersService.unsaveCareer(user.id, careerId);
  }

  @Get(':careerId/status')
  async getStatus(
    @CurrentUser() user: User,
    @Param('careerId') careerId: string,
  ) {
    const saved = await this.savedCareersService.isCareerSaved(
      user.id,
      careerId,
    );
    return { saved };
  }
}
