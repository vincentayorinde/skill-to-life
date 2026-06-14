import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ToggleVisibilityDto } from './dto/toggle-visibility.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMyProfile(@CurrentUser() user: User) {
    return this.profileService.findOrCreate(user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateProfile(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(user.id, dto);
  }

  @Put('visibility')
  @UseGuards(JwtAuthGuard)
  toggleVisibility(
    @CurrentUser() user: User,
    @Body() dto: ToggleVisibilityDto,
  ) {
    return this.profileService.toggleVisibility(user.id, dto.isPublic);
  }

  @Get('username/check/:username')
  async checkUsername(@Param('username') username: string) {
    const available = await this.profileService.checkUsernameAvailable(username);
    return { available };
  }

  @Get(':username')
  getPublicProfile(@Param('username') username: string) {
    return this.profileService.getPublicProfile(username);
  }
}
