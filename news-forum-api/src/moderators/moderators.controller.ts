import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';

@Controller('moderators')
export class ModeratorsController {
  constructor(private readonly moderatorsService: ModeratorsService) {}

  @Post()
  create(@Body() createModeratorDto: CreateModeratorDto) {
    return this.moderatorsService.create(createModeratorDto);
  }

  @Get()
  findAll() {
    return this.moderatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moderatorsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModeratorDto: CreateModeratorDto,
  ) {
    return this.moderatorsService.update(id, updateModeratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moderatorsService.remove(id);
  }
}
