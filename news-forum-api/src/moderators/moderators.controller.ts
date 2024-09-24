import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('moderators')
export class ModeratorsController {
  constructor(private readonly moderatorsService: ModeratorsService) {}

  @Post()
  async create(@Body() createModeratorDto: CreateModeratorDto) {
    return await this.moderatorsService.create(createModeratorDto);
  }

  @Get()
  async findAll() {
    return await this.moderatorsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('id/:id')
  async findOneById(@Param('id') id: string) {
    return await this.moderatorsService.findOneById(id);
  }

  @Get('/username/:username')
  async findOneByUsername(@Param('username') username: string) {
    return await this.moderatorsService.findOneByUsername(username);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModeratorDto: CreateModeratorDto,
  ) {
    return await this.moderatorsService.update(id, updateModeratorDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.moderatorsService.remove(id);
  }
}
