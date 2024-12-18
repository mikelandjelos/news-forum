import { BadRequestException, Injectable } from '@nestjs/common';
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

    if (await this.findOneByUsername(moderator.username))
      throw new BadRequestException(
        'Moderator with that username already exists!',
      );

    if (await this.findOneByEmail(moderator.email))
      throw new BadRequestException(
        'Moderator with that email already exists!',
      );

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

  async findOneByEmail(email: string) {
    return await this.moderatorRepository.findOneBy({ email });
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
