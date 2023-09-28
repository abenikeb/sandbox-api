import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class MmServicesService {
    
  constructor(private readonly httpService: HttpService) {}
  BASE_URL:string = "https://developerportal.ethiotelebirr.et:38443"
    
  async createTopOrg(shortCode:Number,organizationName:string): Promise<any> {
    let body = {
        "initiator": {
            "identifierType": "13",
            "identifier": "mobileapp",
            "securityCredential": "2s+f/YeWzN3omMObYPJqHgT/kWsHicIWGyAA4qWe/g0="
        },
        "simpleKYCUpdateData": {
            "addField": [
                {
                    "kycName": "[KYC][Contact Details][Preferred Notification Language]",
                    "kycValue": "en"
                }
            ]
        },
        "updateProductsData": {
            "addProduct": [
                {
                    "productID": "330",
                    "effectiveDate": "20230927",
                    "expiryDate": "20991231"
                }
            ]
        },
        "shortCode": shortCode.toString(),
        "organizationName": organizationName
    }
    const responseObservable = this.httpService.post(`${this.BASE_URL}/apiaccess/outbound/mm/createTopOrg`,body);
    const response = await firstValueFrom(responseObservable);
    return response.data
    //                      ^ AxiosInstance interface
  }
  
  
  async getOrgCredInfo(shortCode:Number): Promise<any> {   
    const responseObservable=await this.httpService.get(`${this.BASE_URL}/apiaccess/payment/gateway/getOrgCredInfo/${shortCode}`);
    const response = await firstValueFrom(responseObservable);
    return response.data
  }
  
  async setOrgPublicKey(shortCode:Number): Promise<any> {   
    
    let payload = 
        {
            "keys": {
                "keyName": "publicKey",
                "algorithm": "SHA256withRSA",
                "keyValue": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv2XKDp4NbCWeAnoKKUFQsNx2KqlUSxLnYE/nQ6UvH0Vcu8wYKmbp47tlUQkLh3lrO8loHPUBneP/JEUi2Po5byjXmetMlnKhGPniskDJnIzs9kp+NX3FTYBfh1dwxoleG9twegQjI56RBSG/Xfff07I7BUnO4Aj4H5dslg8RP2NQdrVROqKdqnet2LDFRUBna3vwkGLxSRDaUGgSzKuIR8gQ4JblF5RdLgNV+1DNGY2xQumSAfx59fqZeVGvHSmK5FWnnKJZiU/7O3P/v9SXjfo2vJbgaDjbKDg7dpk3lSRyxfWN6IeayPiGPB7pCGSdVOju/yXIx92kSU2WoF1EvQIDAQAB",
                "keyType": "publicKey",
                "expireDate": "2025-01-01 00:10:00",
                "status": "active"
            },
            "identifier": shortCode.toString(),
            "identifierType": "04"
        }
    const responseObservable = await this.httpService.post(`${this.BASE_URL}/apiaccess/payment/gateway/setOrgPublicKey`,payload);
    const response = await firstValueFrom(responseObservable);
    return response.data
  }
}