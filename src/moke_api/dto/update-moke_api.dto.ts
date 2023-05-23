import { PartialType } from '@nestjs/mapped-types';
import { CreateMokeApiDto } from './create-moke_api.dto';

export class UpdateMokeApiDto extends PartialType(CreateMokeApiDto) {}
