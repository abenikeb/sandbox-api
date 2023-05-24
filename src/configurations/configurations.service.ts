import { Injectable } from '@nestjs/common';
import {Configuration} from './schemas/configuration.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateAppSecret, generateFabricAppKey, generateFabricToken, generateMerchantAppId, generateRSAKeyPairs, generateShortCode } from './util/tools.helper';
@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectModel(Configuration.name) private readonly configurationModel:Model<Configuration>,
  ){}
  async create(id:string): Promise<Configuration> {
    const RSAKeyPairs = generateRSAKeyPairs()
    const createConfig = await this.configurationModel.create({
      merchant_id:generateMerchantAppId(),
      fabric_app_id:generateFabricAppKey(), 
      app_secret:generateAppSecret(),
      short_code:generateShortCode(),
      user_id:id,
      private_key:RSAKeyPairs.privateKey,
      public_key:RSAKeyPairs.publicKey
    });
    return createConfig.save();
  }

  async findAll():Promise<Configuration[]> {
    return this.configurationModel.find().exec();
  }
  async findBy(app_secret:string,fabric_app_id:string):Promise<any>{
    const result= await this.configurationModel.findOne({app_secret:app_secret,fabric_app_id:fabric_app_id}).exec()
    return result
  }
  async findByAll(fabric_app_id:string,merchant_id:string,short_code:string):Promise<any>{
    const result= await this.configurationModel.findOne({fabric_app_id:fabric_app_id,merchant_id:merchant_id,short_code:short_code}).exec()
    return result
  }

  async findOne(id: string): Promise<Configuration>{
    return this.configurationModel.findOne({_id:id}).exec()
  }
  
  update(id: string): Promise<Configuration> {
        const RSAKeyPairs = generateRSAKeyPairs();
        return this.configurationModel.findOneAndUpdate({user_id:id},{
      private_key:RSAKeyPairs.privateKey,
      public_key:RSAKeyPairs.publicKey
        })
  }

  async remove(id: string): Promise<Configuration> {
    const deleteConfig = await this.configurationModel.findByIdAndDelete({_id:id}).exec();
    return deleteConfig;
  }
}
