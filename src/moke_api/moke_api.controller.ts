import { Controller, Post, Body, Headers, Res } from '@nestjs/common';
import { MokeApiService } from './moke_api.service';
import { ApplyFabricTokenDto } from './dto/applyFabricToken.dto';
import { Response } from 'express';

@Controller('moke-api')
export class MokeApiController {
  constructor(private readonly mokeApiService: MokeApiService) {}

  @Post('applyFabricToken')
  applyFabricToken(
    @Body() body: ApplyFabricTokenDto,
    @Headers('X-APP-Key') headers: any,
  ) {
    console.log(body.appSecret); // Output the request body to the console
    console.log(headers); // Output the request headers to the console
    if (!headers || !body.appSecret) {
      return {
        error_code: 'string',
        error_msg: 'string',
      };
    }
    return this.mokeApiService.applyFabricToken(body.appSecret, headers);
  }
  //CreateOrder
  @Post('preOrder')
  createOrder(
    @Body() body: any,
    @Headers('X-APP-Key') fabric_app_id: any,
    @Headers('Authorization') token: any,
  ) {
    const biz = body.biz_content;
    if (
      !token ||
      !fabric_app_id ||
      !body ||
      !biz ||
      !body.timestamp ||
      !body.method ||
      body.method != 'payment.preorder' ||
      !body.nonce_str
    ) {
      return {
        error_code: 'string',
        error_msg: 'string',
      };
    }
    if (!body.sign_type || body.sign_type != 'SHA256WithRSA') {
      return {
        error_code: 'string',
        error_msg: 'sign type must be SHA256WithRSA',
      };
    }
    if (!biz.trans_currency || biz.trans_currency != 'ETB') {
      return {
        error_code: 'string',
        error_msg: 'transCurrency type must be ETB',
      };
    }
    if (
      !biz.total_amount ||
      !biz.notify_url ||
      !biz.title ||
      !biz.business_type ||
      !biz.trade_type
    ) {
      return {
        error_code: 'string',
        error_msg: 'Required parameter is missing or is incorrectly filled',
      };
    }
    return this.mokeApiService.createOrder(
      token,
      fabric_app_id,
      biz.appid,
      biz.merch_code,
      biz.merch_order_id,
      {
        total_amount: biz.total_amount,
        title: biz.title,
        notify_url: biz.notify_url,
        business_type: biz.business_type,
        trade_type: biz.trade_type,
      },
    );
  }
  //payment
  @Post('payment')
  payment(
    @Body() body: any,
    @Headers('X-APP-Key') fabric_app_id: any,
    @Headers('Authorization') token: any,
  ) {
    const rawRequest = body.rawRequest;
    if (!token || !fabric_app_id || !rawRequest) {
      return {
        error_code: 'string',
        error_msg: 'string',
      };
    }
    const request = body.rawRequest.split('&');
    if (request.length != 7 || this.IsSorted(rawRequest) != true) {
      return {
        error_code: 'string',
        error_msg: 'invalid raw request',
      };
    } else {
      const expectedKey = [
        'appid',
        'merch_code',
        'nonce_str',
        'prepay_id',
        'sign',
        'sign_type',
        'timestamp',
      ];
      const value = [];
      for (let index = 0; index < request.length; index++) {
        const key_value = request[index].split('=');
        if (key_value.length != 2) {
          return {
            error_code: 'string',
            error_msg: 'invalid raw requests',
          };
        } else {
          const check = key_value[0] == expectedKey[index];
          if (check) {
            value.push(key_value[1]);
            continue;
          } else {
            return {
              error_code: 'string',
              error_msg: 'invalid raw requests',
            };
          }
        }
      }
      return this.mokeApiService.payment(value, token, fabric_app_id);
    }
  }
  //Query Order
  @Post('queryOrder')
  queryOrder(
    @Body() body: any,
    @Headers('X-APP-Key') fabric_app_id: any,
    @Headers('Authorization') token: any,
    @Res() res: Response,
  ) {
    const biz = body.biz_content;
    if (
      !token ||
      !fabric_app_id ||
      !body ||
      !biz ||
      !body.timestamp ||
      !body.method ||
      body.method != 'payment.queryorder' ||
      !body.nonce_str ||
      !body.version
    ) {
      return {
        error_code: 'string',
        error_msg: 'string',
      };
    }
    if (!body.sign_type || body.sign_type != 'SHA256WithRSA') {
      return {
        error_code: 'string',
        error_msg: 'sign type must be SHA256WithRSA',
      };
    }
    return this.mokeApiService.queryOrder(
      token,
      fabric_app_id,
      biz.appid,
      biz.merch_code,
      biz.merch_order_id,
    );
  }
  IsSorted(rawRequest: string) {
    const incomeing = rawRequest.split('&');
    const expected = rawRequest.split('&').sort();
    let equal = true;
    for (let index = 0; index < incomeing.length; index++) {
      equal = expected[index] === incomeing[index];
    }
    console.log(expected);
    console.log(equal);
    return equal;
  }
}
