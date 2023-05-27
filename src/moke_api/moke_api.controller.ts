import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
    if (!headers) {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg: '49401024995:Parameter:X-APP-Key must be filled in.',
          errorSolution:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!body.appSecret) {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            '49401024995:Parameter:.appSecret less than minimum length. [Required string length at least 1 but was 0].',
          errorSolution:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
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
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!body.sign_type || body.sign_type != 'SHA256WithRSA') {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            '49401024995:Parameter:.sign_type type mismatch. [Required enum value [HmacSHA256, SHA256WithRSA, SHA256withRSA]].',
          errorSolution:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!biz.trans_currency || biz.trans_currency != 'ETB') {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            '49401024995:Parameter:.trans_currency type mismatch. [Required value ETB].',
          errorSolution:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !biz.total_amount ||
      !biz.notify_url ||
      !biz.title ||
      !biz.business_type ||
      !biz.trade_type
    ) {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
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
  @Post('checkout')
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
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
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
          throw new HttpException(
            {
              errorCode: '49401024995',
              errorMsg:
                'Invalid raw request. Check if all the necessary parameters are correctly filled and sorted.',
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          const check = key_value[0] == expectedKey[index];
          if (check) {
            value.push(key_value[1]);
            continue;
          } else {
            throw new HttpException(
              {
                errorCode: '49401024995',
                errorMsg:
                  'Invalid raw request. Check if all the necessary parameters are correctly filled and sorted.',
              },
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }
      if (!value[5] || value[5] != 'SHA256WithRSA') {
        throw new HttpException(
          {
            errorCode: '49401024995',
            errorMsg:
              '49401024995:Parameter:.sign_type type mismatch. [Required enum value [HmacSHA256, SHA256WithRSA, SHA256withRSA]].',
            errorSolution:
              'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!value[4]) {
        throw new HttpException(
          {
            errorCode: '60200099',
            errorMsg: 'Verify the sign field failed.',
          },
          HttpStatus.BAD_REQUEST,
        );
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
    // @Res() res: Response,x
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
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!body.sign_type || body.sign_type != 'SHA256WithRSA') {
      throw new HttpException(
        {
          errorCode: '49401024995',
          errorMsg:
            '49401024995:Parameter:.sign_type type mismatch. [Required enum value [HmacSHA256, SHA256WithRSA, SHA256withRSA]].',
          errorSolution:
            'Incoming parameters are missing mandatory parameters.Check whether all required parameters in the interface have been assigned.',
        },
        HttpStatus.BAD_REQUEST,
      );
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
    return equal;
  }
}
