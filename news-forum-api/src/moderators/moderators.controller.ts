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
import { JwtGuard } from 'src/auth/jwt.guard';

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

  @UseGuards(JwtGuard)
  @Get('id/:id')
  async findOneById(@Param('id') id: string) {
    return await this.moderatorsService.findOneById(id);
  }

  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string) {
    return await this.moderatorsService.findOneByUsername(username);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.moderatorsService.findOneByEmail(email);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModeratorDto: CreateModeratorDto,
  ) {
    return await this.moderatorsService.update(id, updateModeratorDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.moderatorsService.remove(id);
  }
}
