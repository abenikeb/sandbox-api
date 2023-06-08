import { Injectable } from '@nestjs/common';
import { CreateMokeApiDto } from './dto/create-moke_api.dto';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import {
  generateFabricToken,
  generateNonceStr,
  generatePrepayId,
} from 'src/configurations/util/tools.helper';

@Injectable()
export class MokeApiService {
  info = {
    prepay_id: '',
    merch_order_id: '',
    title: '',
    total_amount: '',
    token: '',
    notify_url: '',
    business_type: '',
    trade_type: '',
    trade_status: '',
    trans_time: '',
  };

  constructor(private readonly configurationsService: ConfigurationsService) {}

  create(createMokeApiDto: CreateMokeApiDto) {
    return 'This action adds a new mokeApi';
  }
  async applyFabricToken(app_secret: string, fabric_app_id: string) {
    const result = await this.configurationsService.findBy(
      app_secret,
      fabric_app_id,
    );
    if (result == null) {
      console.log('@Apply Fail', this.info);
      return {
        errorCode: '49401031101',
        errorSolution:
          '1. Check whether the authentication token or Basic authentication information is correctly set in the interface.\n2. If the authentication information is set correctly, contact the management to confirm that it is not authorized to perform such operations.',
        errorMsg:
          'The operation is restricted and the access function is not authorized.Detail:Forbidden !\nerr:app key or app secret is invalid!\n',
      };
    } else {
      const time = new Date();
      const token = generateFabricToken();
      this.info.token = token;
      console.log('@Apply success', this.info);
      return {
        effectiveDate: Date.now().toString(),
        expirationDate: (Date.now() + 60 * 60 * 1000).toString(),
        token: token,
      };
    }
  }

  async createOrder(
    token: string,
    fabric_app_id: string,
    merchant_id: string,
    short_code: string,
    merch_order_id: string,
    biz: any,
  ) {
    const result = await this.configurationsService.findByAll(
      fabric_app_id,
      merchant_id,
      short_code,
    );
    if (result == null) {
      console.log('@create Fail', this.info);
      throw new HttpException(
        {
          errorCode: '60200087',
          errorMsg: 'Organization does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (this.info.token !== token) {
      throw new HttpException(
        {
          errorCode: '60200088',
          errorMsg: 'Invalid or expired token.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      this.info.merch_order_id = merch_order_id;
      const prepay_id = generatePrepayId();
      this.info.prepay_id = prepay_id;
      this.info.business_type = biz.business_type;
      this.info.notify_url = biz.notify_url;
      this.info.total_amount = biz.total_amount;
      this.info.title = biz.title;
      this.info.trade_type = biz.trade_type;
      console.log('@create success', this.info);

      return {
        result: 'SUCCESS',
        code: '0',
        msg: 'success',
        nonce_str: generateNonceStr(),
        sign: 'YXpiQ0kGHE7c8JTpEwRzDauUIe/FHAFfQSU1cLj4H04nl2v22gGE+uaXH8PsFgCIIWimb4W8vo2N5dSBwC63/srVasbiFtON9mY0I4WuHJQXVYG8+da3vliL+ErdU83VEZO9IIyFXfHJWVLG0Xfx1LiHI/vj4mdlR7YtSCrn2TIGax5K4aaHqz0hmgqhrMya8HeNtFKXylQPqVksOOOYaipK3zMX2sZGTBamNXETNJ9/t5dPqxoQPCMfCarQAqbD0PRubJqUkuKZgOCX5NjeU2L7PdCa5P08BKvmrE9ffKsPw+HiIyu+GJlhjGenOADkbsntObBfrEM9raMgzDESnJLsaGp4x872XgalxChQlCaudH+mw2VvmBMFEXCeic1XQO3/8qi+WNd1Zi0kiQtdyzwmmfTEr98RPFN4Wf6iRfULyZ/tXofvJEPpOMMq371zsWiStTswg+R0u5dRI8bFilIeJ2BJq8vKfUmn1E4dmZQJbAd6yrbmlWLJEtmVK5f7',
        sign_type: 'SHA256WithRSA',
        biz_content: {
          merch_order_id: merch_order_id,
          prepay_id: prepay_id,
        },
      };
    }
  }

  async queryOrder(
    token: string,
    fabric_app_id: string,
    merchant_id: string,
    short_code: string,
    merch_order_id: string,
  ) {
    const result = await this.configurationsService.findByAll(
      fabric_app_id,
      merchant_id,
      short_code,
    );
    if (result == null) {
      console.log('@query Fail', this.info);
      throw new HttpException(
        {
          errorCode: '60200087',
          errorMsg: 'Organization does not exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (token != this.info.token) {
      throw new HttpException(
        {
          errorCode: '60200088',
          errorMsg: 'Invalid or expired token.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } else if (merch_order_id != this.info.merch_order_id) {
      throw new HttpException(
        {
          errorCode: '60200088',
          errorMsg: 'Invalid merch_order_id.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (this.info.trade_status != 'Completed') {
      throw new HttpException(
        {
          errorCode: '60200088',
          errorMsg: 'Order not completed.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      console.log('@query success', this.info);
      return {
        result: 'SUCCESS',
        code: '0',
        msg: 'Success',
        nonce_str: generateNonceStr(),
        sign: 'YXpiQ0kGHE7c8JTpEwRzDauUIe/FHAFfQSU1cLj4H04nl2v22gGE+uaXH8PsFgCIIWimb4W8vo2N5dSBwC63/srVasbiFtON9mY0I4WuHJQXVYG8+da3vliL+ErdU83VEZO9IIyFXfHJWVLG0Xfx1LiHI/vj4mdlR7YtSCrn2TIGax5K4aaHqz0hmgqhrMya8HeNtFKXylQPqVksOOOYaipK3zMX2sZGTBamNXETNJ9/t5dPqxoQPCMfCarQAqbD0PRubJqUkuKZgOCX5NjeU2L7PdCa5P08BKvmrE9ffKsPw+HiIyu+GJlhjGenOADkbsntObBfrEM9raMgzDESnJLsaGp4x872XgalxChQlCaudH+mw2VvmBMFEXCeic1XQO3/8qi+WNd1Zi0kiQtdyzwmmfTEr98RPFN4Wf6iRfULyZ/tXofvJEPpOMMq371zsWiStTswg+R0u5dRI8bFilIeJ2BJq8vKfUmn1E4dmZQJbAd6yrbmlWLJEtmVK5f7',
        sign_type: 'SHA256WithRSA',
        biz_content: {
          merch_order_id: this.info.merch_order_id,
          prepay_id: this.info.prepay_id,
          payment_order_id: generateNonceStr(),
          trans_time: Date.now(),
          trans_currency: 'ETB',
          total_amount: this.info.total_amount,
        },
      };
    }
  }

  async payment(value: any, token: string, fabric_app_id: string) {
    const result = await this.configurationsService.findByAll(
      fabric_app_id,
      value[0],
      value[1],
    );
    if (result == null) {
      console.log('@payment Fail', this.info);
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            'Invalid raw request. Check if all the necessary parameters are correctly filled and sorted.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (token != this.info.token) {
      return {
        error_code: 'string',
        error_msg: 'Authorization error',
      };
    } else if (value[3] != this.info.prepay_id) {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            'Invalid raw request. Check if all the necessary parameters are correctly filled and sorted.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else if (value[2].length != 32) {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            'Invalid raw request. Check if all the necessary parameters are correctly filled and sorted.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      this.info.trade_status = 'Completed';
      this.info.trans_time = Date.now().toString();
      // await this.callback(value[0], value[1]);
      return {
        result: 'SUCCESS',
        code: '0',
        msg: 'Success',
        trade_status: 'Completed',
        trans_time: this.info.trans_time,
      };
    }
  }

  async callback(appId: string, merch_code: string) {
    // const url = 'http://localhost:8081/notify/transaction';
    const response = await axios.post(this.info.notify_url, {
      notify_url: this.info.notify_url,
      appid: appId,
      notify_time: Date.now().toString(),
      merch_code: merch_code,
      merch_order_id: this.info.merch_order_id,
      payment_order_id: '00801104C911443200001002',
      total_amount: this.info.total_amount,
      trans_id: '87654567865',
      trans_currency: 'ETB',
      trade_status: this.info.trade_status,
      trans_end_time: this.info.trans_time,
      sign: 'AOwWQF0QDg0jzzs5otLYOunoR65GGgC3hyr+oYn8mm1Qph6Een7C…',
      sign_type: 'SHA256WithRSA',
    });
    return response.status;
  }
}
