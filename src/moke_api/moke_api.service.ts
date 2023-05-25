import { Injectable } from '@nestjs/common';
import { CreateMokeApiDto } from './dto/create-moke_api.dto';
import { UpdateMokeApiDto } from './dto/update-moke_api.dto';
import { Configuration } from 'src/configurations/schemas/configuration.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { generateFabricToken, generateNonceStr, generatePrepayId } from 'src/configurations/util/tools.helper';

@Injectable()
export class MokeApiService {
   info={
    "prepay_id":"",
    "merch_order_id":"",
    "title":"",
    "total_amount":"",
    "token":""
  }
  // constructor(
  //   @InjectModel(Configuration.name) private readonly configurationModel:Model<Configuration>,
  // ){}
  constructor(private readonly configurationsService: ConfigurationsService) {}

  create(createMokeApiDto: CreateMokeApiDto) {
    return 'This action adds a new mokeApi';
  }
  async applyFabricToken(app_secret:string,fabric_app_id:string) {
    const result=await this.configurationsService.findBy(app_secret,fabric_app_id);
    // const result="false"
    console.log(result)
    if(result==null){
      return {
        "error_code":"string",
        "error_msg":"string_s"
      }
    }

    const time= new Date()
    const token=generateFabricToken()
    this.info.token=token
    return {
      "effectiveDate":Date.now(),
      "expirationDate":new Date(time.getMinutes()+5*60),
      "token":token
    }
  }
  
  async queryOrder(token:string,fabric_app_id:string,merchant_id:string,short_code:string,merch_order_id:string){
    const result = await this.configurationsService.findByAll(fabric_app_id,merchant_id,short_code);
    if(result==null){
      return {
        "error_code":"string",
        "error_msg":"string_s"
      }
    }
    
    return {
    "result": "SUCCESS",
    "code": "0",
    "msg": "Success",
    "nonce_str": generateNonceStr(),
    "sign": 'YXpiQ0kGHE7c8JTpEwRzDauUIe/FHAFfQSU1cLj4H04nl2v22gGE+uaXH8PsFgCIIWimb4W8vo2N5dSBwC63/srVasbiFtON9mY0I4WuHJQXVYG8+da3vliL+ErdU83VEZO9IIyFXfHJWVLG0Xfx1LiHI/vj4mdlR7YtSCrn2TIGax5K4aaHqz0hmgqhrMya8HeNtFKXylQPqVksOOOYaipK3zMX2sZGTBamNXETNJ9/t5dPqxoQPCMfCarQAqbD0PRubJqUkuKZgOCX5NjeU2L7PdCa5P08BKvmrE9ffKsPw+HiIyu+GJlhjGenOADkbsntObBfrEM9raMgzDESnJLsaGp4x872XgalxChQlCaudH+mw2VvmBMFEXCeic1XQO3/8qi+WNd1Zi0kiQtdyzwmmfTEr98RPFN4Wf6iRfULyZ/tXofvJEPpOMMq371zsWiStTswg+R0u5dRI8bFilIeJ2BJq8vKfUmn1E4dmZQJbAd6yrbmlWLJEtmVK5f7',
    "sign_type": "SHA256WithRSA",
    "biz_content":
      {
     "merch_order_id": "201907151435001",
     "prepay_id": generatePrepayId(),
     "payment_order_id": generateNonceStr(),
        "trans_time": Date.now(),
        "trans_currency": "ETB",
        "total_amount": "10"
      }
}

  }
  async createOrder(token:string,fabric_app_id:string,merchant_id:string,short_code:string,merch_order_id:string){
    const result = await this.configurationsService.findByAll(fabric_app_id,merchant_id,short_code);
    console.log(result.private_key)
    console.log("=========================================pub================================")
    console.log(result.public_key)
    if(this.info.token!==token){
      return {
        "error_code":"string",
        "error_msg":"Authorization error"
      }
    }
    if(result==null){
      return {
        "error_code":"string",
        "error_msg":"string_s"
      }
    }
    this.info.merch_order_id=merch_order_id
    const prepay_id=generatePrepayId()
    this.info.prepay_id=prepay_id
    return {
  "result": 'SUCCESS',
  "code": '0',
  "msg": 'success',
  "nonce_str": generateNonceStr(),
  "sign": 'YXpiQ0kGHE7c8JTpEwRzDauUIe/FHAFfQSU1cLj4H04nl2v22gGE+uaXH8PsFgCIIWimb4W8vo2N5dSBwC63/srVasbiFtON9mY0I4WuHJQXVYG8+da3vliL+ErdU83VEZO9IIyFXfHJWVLG0Xfx1LiHI/vj4mdlR7YtSCrn2TIGax5K4aaHqz0hmgqhrMya8HeNtFKXylQPqVksOOOYaipK3zMX2sZGTBamNXETNJ9/t5dPqxoQPCMfCarQAqbD0PRubJqUkuKZgOCX5NjeU2L7PdCa5P08BKvmrE9ffKsPw+HiIyu+GJlhjGenOADkbsntObBfrEM9raMgzDESnJLsaGp4x872XgalxChQlCaudH+mw2VvmBMFEXCeic1XQO3/8qi+WNd1Zi0kiQtdyzwmmfTEr98RPFN4Wf6iRfULyZ/tXofvJEPpOMMq371zsWiStTswg+R0u5dRI8bFilIeJ2BJq8vKfUmn1E4dmZQJbAd6yrbmlWLJEtmVK5f7',
  "sign_type": "SHA256WithRSA",
  "biz_content": {
    "merch_order_id": merch_order_id,
    "prepay_id":prepay_id
  }
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
