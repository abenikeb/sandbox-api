import { Injectable } from '@nestjs/common';
import { CreateMokeApiDto } from './dto/create-moke_api.dto';
import { UpdateMokeApiDto } from './dto/update-moke_api.dto';
import { Configuration } from 'src/configurations/schemas/configuration.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { generateFabricToken } from 'src/configurations/util/tools.helper';

@Injectable()
export class MokeApiService {
  // constructor(
  //   @InjectModel(Configuration.name) private readonly configurationModel:Model<Configuration>,
  // ){}
  constructor(private readonly configurationsService: ConfigurationsService) {}

  create(createMokeApiDto: CreateMokeApiDto) {
    return 'This action adds a new mokeApi';
  }
  applyFabricToken(app_secret:string,fabric_app_id:string) {
    this.configurationsService.findBy(app_secret,fabric_app_id);
    return {
      "effectiveDate":Date.now(),
      "expirationDate":Date.now(),
      "token":generateFabricToken()
    }
  }

  findAll() {
    return `This action returns all mokeApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mokeApi`;
  }

  update(id: number, updateMokeApiDto: UpdateMokeApiDto) {
    return `This action updates a #${id} mokeApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} mokeApi`;
  }
}
