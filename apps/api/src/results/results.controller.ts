import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ClaimResultDto } from './dto/claim-result.dto';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  @UseGuards(OptionalJwtGuard)
  create(@Body() dto: CreateResultDto, @CurrentUser() user: User | null) {
    return this.resultsService.create(dto, user?.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user: User) {
    return this.resultsService.findAllForUser(user.id);
  }

  @Get(':id')
  @UseGuards(OptionalJwtGuard)
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: User | null,
    @Query('anonymousToken') anonymousToken?: string,
  ) {
    return this.resultsService.findOne(id, user?.id, anonymousToken);
  }

  @Post(':id/claim')
  @UseGuards(JwtAuthGuard)
  claim(
    @Param('id') id: string,
    @Body() dto: ClaimResultDto,
    @CurrentUser() user: User,
  ) {
    return this.resultsService.claim(id, dto.anonymousToken, user.id);
  }
}
