import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMerchantInfoDto } from './dto/create-merchant_info.dto';
import { UpdateMerchantInfoDto } from './dto/update-merchant_info.dto';
import { generateShortCode } from 'src/configurations/util/tools.helper';
import { Merchant } from './schemas/merchant_info.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { MmServicesService } from 'src/mm_services/mm_services.service';
@Injectable()
export class MerchantInfoService {
  constructor(
    @InjectModel(Merchant.name)
    private readonly MerchantModel: Model<Merchant>,
    private readonly mmServicesService: MmServicesService
  ) {}
  
  async create(createMerchantInfoDto: CreateMerchantInfoDto) {
    let short_code = generateShortCode();
    let same_code = await this.mmServicesService.getOrgCredInfo(short_code)
    let same_code_db = await this.MerchantModel.findOne({short_code:short_code})
    if (same_code?.shortCode || same_code_db) {
      short_code = generateShortCode()
    }
    const merchant_info = {
      businessCatagory:createMerchantInfoDto.businessCatagory,
      companyName:createMerchantInfoDto.companyName,
      contactEmail:createMerchantInfoDto.contactEmail,
      contactPersonName:createMerchantInfoDto.contactPersonName,
      contactPhone:createMerchantInfoDto.contactPhone,
      createdAt:Date.now(),
      updatedAt:Date.now(),
      developerTeamName:createMerchantInfoDto.developerTeamName,
      officialWebsite:createMerchantInfoDto.officialWebsite,
      short_code:short_code,
      status:"pending",
      user_id:createMerchantInfoDto.user_id
    }
const existingMerchant = await this.MerchantModel.findOne({ developerTeamName: createMerchantInfoDto.developerTeamName });
const existingCompany = await this.MerchantModel.findOne({ companyName: createMerchantInfoDto.companyName });
const user_idExist = await this.MerchantModel.findOne({ user_id: createMerchantInfoDto.user_id });

if (existingMerchant) {
  throw new HttpException(
    {
      error_code: 'SYS0001',
      error_msg: 'DeveloperTeam Already Exist',
    },
    HttpStatus.BAD_REQUEST,
  );
} 
else if(user_idExist){
  throw new HttpException(
    {
      error_code: 'SYS0002',
      error_msg: 'User Already Exist',
    },
    HttpStatus.BAD_REQUEST,
  );
}
else if(existingCompany){
  throw new HttpException(
    {
      error_code: 'SYS0002',
      error_msg: 'Company Already Exist',
    },
    HttpStatus.BAD_REQUEST,
  );
}
else {
  let createMerchant = await this.MerchantModel.create(merchant_info)
  await createMerchant.save().then(res=>{
    console.log(`
    ============================================
    Company Name: {${merchant_info.companyName}}
    ============================================
    ShortCode: ${merchant_info.short_code}
    ============================================`)
    this.mmServicesService.createTopOrg(short_code,res.companyName)
  })
  return this.MerchantModel.findOne({ user_id:merchant_info.user_id }).exec();
}
    
  }

  async findAll(): Promise<Merchant[]> {
    return this.MerchantModel.find().exec();
  } 

  async findOneWithSortCode(user_id:any): Promise<Merchant> {
    const mertchstatus = await this.MerchantModel.findOne({ user_id }).exec();
    console.log(JSON.stringify(mertchstatus))
    const credientials = await this.mmServicesService.getOrgCredInfo(mertchstatus?.short_code)
    console.log(JSON.stringify(credientials))
    if(credientials?.shortCode){
      console.log(credientials?.shortCode)
      await this.mmServicesService.setOrgPublicKey(mertchstatus?.short_code)
      await this.MerchantModel.findOneAndUpdate({user_id:user_id},{status:"completed",merchantAppId:credientials?.merchantAppId,fabricAppSercet:credientials?.fabricAppSercet,fabricAppId:credientials?.fabricAppId,  privateKey: `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/ZcoOng1sJZ4CegopQVCw3HYqqVRLEudgT+dDpS8fRVy7zBgqZunju2VRCQuHeWs7yWgc9QGd4/8kRSLY+jlvKNeZ60yWcqEY+eKyQMmcjOz2Sn41fcVNgF+HV3DGiV4b23B6BCMjnpEFIb9d99/TsjsFSc7gCPgfl2yWDxE/Y1B2tVE6op2qd63YsMVFQGdre/CQYvFJENpQaBLMq4hHyBDgluUXlF0uA1X7UM0ZjbFC6ZIB/Hn1+pl5Ua8dKYrkVaecolmJT/s7c/+/1JeN+ja8luBoONsoODt2mTeVJHLF9Y3oh5rI+IY8HukIZJ1U6O7/JcjH3aRJTZagXUS9AgMBAAECggEBALBIBx8JcWFfEDZFwuAWeUQ7+VX3mVx/770kOuNx24HYt718D/HV0avfKETHqOfA7AQnz42EF1Yd7Rux1ZO0e3unSVRJhMO4linT1XjJ9ScMISAColWQHk3wY4va/FLPqG7N4L1w3BBtdjIc0A2zRGLNcFDBlxl/CVDHfcqD3CXdLukm/friX6TvnrbTyfAFicYgu0+UtDvfxTL3pRL3u3WTkDvnFK5YXhoazLctNOFrNiiIpCW6dJ7WRYRXuXhz7C0rENHyBtJ0zura1WD5oDbRZ8ON4v1KV4QofWiTFXJpbDgZdEeJJmFmt5HIi+Ny3P5n31WwZpRMHGeHrV23//0CgYEA+2/gYjYWOW3JgMDLX7r8fGPTo1ljkOUHuH98H/a/lE3wnnKKx+2ngRNZX4RfvNG4LLeWTz9plxR2RAqqOTbX8fj/NA/sS4mru9zvzMY1925FcX3WsWKBgKlLryl0vPScq4ejMLSCmypGz4VgLMYZqT4NYIkU2Lo1G1MiDoLy0CcCgYEAwt77exynUhM7AlyjhAA2wSINXLKsdFFF1u976x9kVhOfmbAutfMJPEQWb2WXaOJQMvMpgg2rU5aVsyEcuHsRH/2zatrxrGqLqgxaiqPz4ELINIh1iYK/hdRpr1vATHoebOv1wt8/9qxITNKtQTgQbqYci3KV1lPsOrBAB5S57nsCgYAvw+cagS/jpQmcngOEoh8I+mXgKEET64517DIGWHe4kr3dO+FFbc5eZPCbhqgxVJ3qUM4LK/7BJq/46RXBXLvVSfohR80Z5INtYuFjQ1xJLveeQcuhUxdK+95W3kdBBi8lHtVPkVsmYvekwK+ukcuaLSGZbzE4otcn47kajKHYDQKBgDbQyIbJ+ZsRw8CXVHu2H7DWJlIUBIS3s+CQ/xeVfgDkhjmSIKGX2to0AOeW+S9MseiTE/L8a1wY+MUppE2UeK26DLUbH24zjlPoI7PqCJjl0DFOzVlACSXZKV1lfsNEeriC61/EstZtgezyOkAlSCIH4fGr6tAeTU349Bnt0RtvAoGBAObgxjeH6JGpdLz1BbMj8xUHuYQkbxNeIPhH29CySn0vfhwg9VxAtIoOhvZeCfnsCRTj9OZjepCeUqDiDSoFznglrKhfeKUndHjvg+9kiae92iI6qJudPCHMNwP8wMSphkxUqnXFR3lr9A765GA980818UWZdrhrjLKtIIZdh+X1`}).exec()
      
      return this.MerchantModel.findOne({ user_id }).exec();

    }
    else{ 
      return this.MerchantModel.findOne({ user_id }).exec();
    }
  }

  // async updateComplete(short_code: Number, updateMerchantInfoDto: any,res): Promise<any>{
  //   const updatedMerchant = await this.MerchantModel.findOneAndUpdate(
  //     { short_code: short_code},
  //     {
  //       status:"completed"
  //     },
  //   );
  //   return res.json({
  //     updatedMerchant,
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} merchantInfo`;
  }
}
