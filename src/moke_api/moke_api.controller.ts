import { Controller, Post, Body, Headers } from '@nestjs/common';
import { MokeApiService } from './moke_api.service';
import { ApplyFabricTokenDto } from './dto/applyFabricToken.dto';

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
    rawRequest.con;

    this.mokeApiService.payment(rawRequest);
  }
  //Query Order
  @Post('queryOrder')
  queryOrder(
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
}
