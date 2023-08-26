import { Injectable } from '@nestjs/common';
import { Configuration } from './schemas/configuration.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  generateAppSecret,
  generateFabricAppKey,
  generateMerchantAppId,
  generateRSAKeyPairs,
  generateShortCode,
} from './util/tools.helper';
@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectModel(Configuration.name)
    private readonly configurationModel: Model<Configuration>,
  ) {}
  async create(id: string): Promise<Configuration> {
    const RSAKeyPairs = await generateRSAKeyPairs();
    // const createConfig = await this.configurationModel.create({
    //   merchant_id: generateMerchantAppId(),
    //   fabric_app_id: generateFabricAppKey(),
    //   app_secret: generateAppSecret(),
    //   short_code: generateShortCode(),
    //   user_id: id,
    //   private_key: RSAKeyPairs.privateKey,
    //   public_key: RSAKeyPairs.publicKey,
    // });
    const createConfig = await this.configurationModel.create({
      merchant_id: '930231098009602',
      fabric_app_id: 'c4182ef8-9249-458a-985e-06d191f4d505',
      app_secret: 'fad0f06383c6297f545876694b974599',
      short_code: '101011',
      user_id: id,
      private_key: `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/ZcoOng1sJZ4CegopQVCw3HYqqVRLEudgT+dDpS8fRVy7zBgqZunju2VRCQuHeWs7yWgc9QGd4/8kRSLY+jlvKNeZ60yWcqEY+eKyQMmcjOz2Sn41fcVNgF+HV3DGiV4b23B6BCMjnpEFIb9d99/TsjsFSc7gCPgfl2yWDxE/Y1B2tVE6op2qd63YsMVFQGdre/CQYvFJENpQaBLMq4hHyBDgluUXlF0uA1X7UM0ZjbFC6ZIB/Hn1+pl5Ua8dKYrkVaecolmJT/s7c/+/1JeN+ja8luBoONsoODt2mTeVJHLF9Y3oh5rI+IY8HukIZJ1U6O7/JcjH3aRJTZagXUS9AgMBAAECggEBALBIBx8JcWFfEDZFwuAWeUQ7+VX3mVx/770kOuNx24HYt718D/HV0avfKETHqOfA7AQnz42EF1Yd7Rux1ZO0e3unSVRJhMO4linT1XjJ9ScMISAColWQHk3wY4va/FLPqG7N4L1w3BBtdjIc0A2zRGLNcFDBlxl/CVDHfcqD3CXdLukm/friX6TvnrbTyfAFicYgu0+UtDvfxTL3pRL3u3WTkDvnFK5YXhoazLctNOFrNiiIpCW6dJ7WRYRXuXhz7C0rENHyBtJ0zura1WD5oDbRZ8ON4v1KV4QofWiTFXJpbDgZdEeJJmFmt5HIi+Ny3P5n31WwZpRMHGeHrV23//0CgYEA+2/gYjYWOW3JgMDLX7r8fGPTo1ljkOUHuH98H/a/lE3wnnKKx+2ngRNZX4RfvNG4LLeWTz9plxR2RAqqOTbX8fj/NA/sS4mru9zvzMY1925FcX3WsWKBgKlLryl0vPScq4ejMLSCmypGz4VgLMYZqT4NYIkU2Lo1G1MiDoLy0CcCgYEAwt77exynUhM7AlyjhAA2wSINXLKsdFFF1u976x9kVhOfmbAutfMJPEQWb2WXaOJQMvMpgg2rU5aVsyEcuHsRH/2zatrxrGqLqgxaiqPz4ELINIh1iYK/hdRpr1vATHoebOv1wt8/9qxITNKtQTgQbqYci3KV1lPsOrBAB5S57nsCgYAvw+cagS/jpQmcngOEoh8I+mXgKEET64517DIGWHe4kr3dO+FFbc5eZPCbhqgxVJ3qUM4LK/7BJq/46RXBXLvVSfohR80Z5INtYuFjQ1xJLveeQcuhUxdK+95W3kdBBi8lHtVPkVsmYvekwK+ukcuaLSGZbzE4otcn47kajKHYDQKBgDbQyIbJ+ZsRw8CXVHu2H7DWJlIUBIS3s+CQ/xeVfgDkhjmSIKGX2to0AOeW+S9MseiTE/L8a1wY+MUppE2UeK26DLUbH24zjlPoI7PqCJjl0DFOzVlACSXZKV1lfsNEeriC61/EstZtgezyOkAlSCIH4fGr6tAeTU349Bnt0RtvAoGBAObgxjeH6JGpdLz1BbMj8xUHuYQkbxNeIPhH29CySn0vfhwg9VxAtIoOhvZeCfnsCRTj9OZjepCeUqDiDSoFznglrKhfeKUndHjvg+9kiae92iI6qJudPCHMNwP8wMSphkxUqnXFR3lr9A765GA980818UWZdrhrjLKtIIZdh+X1
-----END PRIVATE KEY-----`,
      public_key: RSAKeyPairs.publicKey,
    });
    return createConfig.save();
  }

  async findAll(): Promise<Configuration[]> {
    return this.configurationModel.find().exec();
  }
  async findBy(app_secret: string, fabric_app_id: string): Promise<any> {
    const result = await this.configurationModel
      .findOne({ app_secret: app_secret, fabric_app_id: fabric_app_id })
      .exec();
    return result;
  }
  async findByAll(
    fabric_app_id: string,
    merchant_id: string,
    short_code: string,
  ): Promise<any> {
    const result = await this.configurationModel
      .findOne({
        fabric_app_id: fabric_app_id,
        merchant_id: merchant_id,
        short_code: short_code,
      })
      .exec();
    return result;
  }

  async findOne(id: string): Promise<Configuration> {
    return this.configurationModel.findOne({ _id: id }).exec();
  }

  async update(id: string): Promise<Configuration> {
    const RSAKeyPairs = await generateRSAKeyPairs();
    return this.configurationModel.findOneAndUpdate(
      { user_id: id },
      {
        private_key: RSAKeyPairs.privateKey,
        public_key: RSAKeyPairs.publicKey,
      },
    );
  }
  async updateNotifyUrl(id: string, url: string): Promise<Configuration> {
    return this.configurationModel.findOneAndUpdate(
      { user_id: id },
      {
        notify_url: url,
      },
    );
  }

  async remove(id: string): Promise<Configuration> {
    const deleteConfig = await this.configurationModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deleteConfig;
  }
}
