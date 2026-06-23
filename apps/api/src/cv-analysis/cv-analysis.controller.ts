import {
  Body,
  Controller,
  Get,
  Param,
  PayloadTooLargeException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { memoryStorage } from 'multer';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyseCvLinkedInDto, AnalyseCvTextDto } from './dto/analyse-cv.dto';
import { CvAnalysisService, CvUploadFile } from './cv-analysis.service';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

@Controller('cv-analysis')
@UseGuards(JwtAuthGuard)
export class CvAnalysisController {
  constructor(private readonly cvAnalysisService: CvAnalysisService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(new Error('Please upload a PDF file.'), false);
        }
      },
    }),
  )
  async uploadCv(
    @CurrentUser() user: User,
    @UploadedFile() file: CvUploadFile,
  ) {
    if (!file) {
      throw new PayloadTooLargeException(
        'Your CV must be under 5MB. Try compressing the PDF.',
      );
    }
    return this.cvAnalysisService.analyseFromFile(user.id, file);
  }

  @Post('text')
  analyseText(
    @CurrentUser() user: User,
    @Body() dto: AnalyseCvTextDto,
  ) {
    return this.cvAnalysisService.analyseFromText(user.id, dto.text);
  }

  @Post('linkedin')
  analyseLinkedIn(
    @CurrentUser() user: User,
    @Body() dto: AnalyseCvLinkedInDto,
  ) {
    return this.cvAnalysisService.analyseFromLinkedIn(user.id, dto.linkedinUrl);
  }

  @Get()
  getAnalyses(@CurrentUser() user: User) {
    return this.cvAnalysisService.getAnalyses(user.id);
  }

  @Get(':id')
  getAnalysis(@CurrentUser() user: User, @Param('id') id: string) {
    return this.cvAnalysisService.getAnalysis(user.id, id);
  }
}
