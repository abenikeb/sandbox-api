import { Module } from '@nestjs/common';
import { MokeApiService } from './moke_api.service';
import { MokeApiController } from './moke_api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration, ConfigurationSchema } from 'src/configurations/schemas/configuration.schema';
import { ConfigurationsService } from 'src/configurations/configurations.service';

@Module({
  
  imports: [
    MongooseModule.forFeature([{ name: Configuration.name, schema: ConfigurationSchema }]),
  ],
  controllers: [MokeApiController],
  providers: [MokeApiService,ConfigurationsService],
  exports: [MokeApiService]

})
export class MokeApiModule {}
