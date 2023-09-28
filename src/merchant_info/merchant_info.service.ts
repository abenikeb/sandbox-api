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
    console.log(`Last Product: ${short_code}`)
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
    console.log(`company with shortcode ${res.short_code} and name ${res.companyName} was created`)
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
      await this.MerchantModel.findOneAndUpdate({user_id:user_id},{status:"completed"})
      
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
