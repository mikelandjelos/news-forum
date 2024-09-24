import { Injectable } from '@nestjs/common';
import { Moderator } from './entities/moderator.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { UpdateModeratorDto } from './dto/update-moderator.dto';

@Injectable()
export class ModeratorsService {
  constructor(
    @InjectRepository(Moderator)
    private readonly moderatorRepository: Repository<Moderator>,
  ) {}

  async create(createModeratorDto: CreateModeratorDto): Promise<Moderator> {
    const moderator: Moderator = { id: undefined, ...createModeratorDto };
    moderator.password = await hash(createModeratorDto.password, 10);
    return await this.moderatorRepository.save(moderator);
  }

  async findAll(): Promise<Moderator[]> {
    return await this.moderatorRepository.find();
  }

  async findOneById(id: string): Promise<Moderator> {
    return await this.moderatorRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string) {
    return await this.moderatorRepository.findOneBy({ username });
  }

  async update(
    id: string,
    updateModeratorDto: UpdateModeratorDto,
  ): Promise<Moderator> {
    return await this.moderatorRepository.save({ id, ...updateModeratorDto });
  }

  async remove(id: string) {
    return await this.moderatorRepository.delete(id);
  }
}
