import { Injectable } from '@nestjs/common';
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
    // let short_code_exist = await this.MerchantModel
    //   .findOne({ short_code: short_code })
    //   .exec();
    // while (short_code_exist) {
    //    short_code = generateShortCode();
    //    short_code_exist = await this.MerchantModel
    //   .findOne({ short_code: short_code })
    //   .exec();
    // }

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
if (existingMerchant || existingCompany) {
  return {
    "message":"Already exist"
  }
} else {
  let createMerchant = await this.MerchantModel.create(merchant_info)
  createMerchant.save().then(res=>{
    console.log(`company with shortcode ${res.short_code} and name ${res.companyName} was created`)
    return this.mmServicesService.createTopOrg(short_code,res.companyName)
    
  })
}
    
  }

  async findAll(): Promise<Merchant[]> {
    return this.MerchantModel.find().exec();
  } 

  async findOneWithSortCode(user_id:any): Promise<Merchant> {
    const mertchstatus = await this.MerchantModel.findOne({ user_id }).exec();
    console.log(JSON.stringify(mertchstatus))
    const credientials = await this.mmServicesService.getOrgCredInfo(mertchstatus.short_code)
    console.log(JSON.stringify(credientials))
    // if(credientials?.shortCode){
    //   console.log(credientials.short_code)
    //   return this.MerchantModel.findOneAndUpdate({user_id:user_id},{status:"completed"})
      
    // return this.MerchantModel.findOne({ user_id }).exec();
    // }
    // else{ 
    // console.log("else ")
      return this.MerchantModel.findOne({ user_id }).exec();

    // }
  }

  async updateComplete(short_code: Number, updateMerchantInfoDto: any,res): Promise<any>{
    const updatedMerchant = await this.MerchantModel.findOneAndUpdate(
      { short_code: short_code},
      {
        status:"completed"
      },
    );
    return res.json({
      updatedMerchant,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} merchantInfo`;
  }
}
