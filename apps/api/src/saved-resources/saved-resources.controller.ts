import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SaveResourceDto } from './dto/save-resource.dto';
import { SavedResourcesService } from './saved-resources.service';

@Controller('saved-resources')
@UseGuards(JwtAuthGuard)
export class SavedResourcesController {
  constructor(private readonly savedResourcesService: SavedResourcesService) {}

  @Get()
  getSavedResources(@CurrentUser() user: User) {
    return this.savedResourcesService.getSavedResources(user.id);
  }

  @Post()
  saveResource(@CurrentUser() user: User, @Body() dto: SaveResourceDto) {
    return this.savedResourcesService.saveResource(user.id, dto);
  }

  @Delete()
  unsaveResource(
    @CurrentUser() user: User,
    @Body() body: { resourceUrl: string },
  ) {
    return this.savedResourcesService.unsaveResource(user.id, body.resourceUrl);
  }
}
