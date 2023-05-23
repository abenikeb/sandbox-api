import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration, ConfigurationSchema } from './schemas/configuration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Configuration.name, schema: ConfigurationSchema }]),
  ],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService]

})
export class ConfigurationsModule {}
