import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
@Injectable()
export class AppcubeServiceService {
    constructor(private readonly httpService: HttpService) {}
    async setUpManagementConsole(){
        const accessToken = await this.AdministratorAccessToken();
        if (accessToken) {
            
      console.log("==================accessToken=============")
      console.log(accessToken)
      console.log("==================accessToken=============")
           const tenantID= await this.RegisterAppletDevelopers(accessToken)
           if (tenantID) {
            
      console.log("==================tenantID=============")
      console.log(tenantID)
      console.log("==================tenantID=============")
    //   return {
    //     accessToken:accessToken,
    //     tenantID:tenantID
    //   }
            return await this.JoinSite(accessToken,tenantID)
           } else {
            return {
                "message":"No tenantID  Found!"
            }
           }
        }
        else{
            return {
                "message":"No Access Token Found!"
            }
        }

    }
    private async AdministratorAccessToken(): Promise<any> {
        try {
        const url='https://10.175.114.205:32009/u-route/baas/sys/inner/authentication?flag=tool'
        const crt = `-----BEGIN CERTIFICATE-----
MIIDRTCCAi2gAwIBAgIIYnz0uJtu208wDQYJKoZIhvcNAQELBQAwQzELMAkGA1UE
BhMCQ04xDzANBgNVBAoTBkh1YXdlaTEjMCEGA1UEAxMaSFVBV0VJIFNvZnR3YXJl
IFByb2R1Y3QgQ0EwHhcNMTkwNTI4MDgzODE4WhcNMjkwNTI1MDgzODE4WjAtMQsw
CQYDVQQGEwJDTjEPMA0GA1UEChMGSHVhd2VpMQ0wCwYDVQQDEwRvc3FsMIIBIjAN
BgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmZHcUxu7VBuB+Fg/K231RHdx55Sf
PytpWD/jwZheUu2su40ZL6bIwo7rbZwowQoNlcvrIyhRQgNnwxCD8j5V/JGyjPOq
6BcNTmLxc7clC/1D9In7d2NhLcRhX391b5tDA24uzEXAYcjPv0W8rI4WDyKYWCIu
LXgL3ARk0ex0GutldgmPM5niRWj/hkMqgpNniW1TYaIvB1N70cU/eTvp1Bhs/+2M
uF+rS7xCrNJ1Yxg6CP+zR76T/vGnjzUfVon+6e3yXqi8BXmiA5/zuj78TDKiyeyA
H+RtNvVAHLnG9M8fXIQeSdPqZ9wGsLZJNLDYcRwnn5+QWp/7Sadiy574LQIDAQAB
o1MwUTAfBgNVHSMEGDAWgBRzn8df4ZaoDnlxedxpywrxvOD05TAMBgNVHRMEBTAD
AQEAMAsGA1UdDwQEAwIDiDATBgNVHSUEDDAKBggrBgEFBQcDAjANBgkqhkiG9w0B
AQsFAAOCAQEANLdYY68l9ZUUDl6CLDbP6Wa/dwOQ9+JY/vXtjxC/gNmyGgXe9nj7
oFe6HmJNr/TiIKnjkgWEh+6Eml2oQHrJmQGm6P42yh//F2oE1N5NYznpNAX4geac
v6XQL2CEwMPTJ48ch+6E3o3wJaiA6Jelmnoz25v1MIv2jZ+QY/I1MlkutnN+LopV
YbAX1og4FdUHiw3B7MSV1GgSARX93R7FXyTp0Wl/f5NbcSKxPVrFBm13huEZ/ZpT
AU3wNCzQCb0IsFcnO6loaSqoOuaQCX9XIGgfY+Z8Q5NE+bRxNSqmGgE4EFLEzT8x
NmF35wssUWQJlgOcTGSE7tds5buAcE/OSg==
-----END CERTIFICATE-----`;
        const key=`-----BEGIN RSA PRIVATE KEY-----
Proc-Type: 4,ENCRYPTED
DEK-Info: AES-256-CBC,3AB65F66FA1922419436B9FB6466C92B

WE2Wt0TtCdS7jwSRv4bx6NNLrU6fedWnwvzZ7A6fIlQm4CtAj+ycaVw9B5shOS41
rgwiuqB5s0iw1daLqHvEZEnRFqgAaEkc95T0ydPM/VA4i4rvOIyv/8NsVOrc2Jqf
/r61W0PoKcFN/Ipi8lsTtHAEdEtWZA29UmeWGb+L0+rS5yfTNoP4nFjQxArHandW
t22RM2S8W3fg1wvLOtk6sNRiLI5E+ZLUw7ojrEB8eN02+5HeQJBYVhIbbBBSsF06
RMxzHFLopjF6Dh9abr+oLLKBOGxX0056JT4q7Lw0zSF0zvUPxeSb4IAq2+At1ojR
g3Zq4dV1znbM6HP0ixM49gSsdbEIfsYCSIGfZVMW1NpkUuw25rpb3SLus9G6vM+4
V80w+2a+ONRFKvJBEZTm2foVo13wS528vywzUg9QvEDO2MQ2YGI35jWfPNGTPbiw
UqgMnC1jV0ejs6xeZi1QzvZwvCUapRsugbjL6jtsQ/NKEA7vmwrP0yzEDk62VPwh
nyPmuvi6FyZTrQSC6lApe+2650CVHEN/sWyutyV2OzzJnanLkaB9HCbJemQ/OcYy
T622nauaPaFkU0+/pOn259gN6Tap5R2jEDJYN/J0OSC6dD4vUEo7Ptlpmqgm4KD3
WihJsdaLWQH+v/tzn5+J4rdbVp+IYBtpHc7o7ssei4Gx1Oj28oyGYxjBhHTGboxo
TRFEQZ4JzJCJa3V3lpuaE5du8fTd5wzxmUH0wZZ2yfMut1PvPT+mAQjpBeZQzrD6
lnWoWu0Xerkbxztr56A+8xTkWBmpp6+A8ocvthtaMNuYr5qkqAveQYXVOAQq8Teu
XkXDvZlQCVecVApmI4FYlbJRD98JMeR3XiTE1gS3aF2DfDAIVn35+slnE+5WL7gS
8XKScuyq1F6PKnJgxE01x5T5NHFhpoK53llj88ozeggChf/dfHHJPnylhnBen5Ms
PFkSjFeo15MNCrJONMRxYyWhGcEebfiQEB+m2XCUhHVPm3gwaSxh6u9yQyxAJNli
6stn8Xee1vJLEHywTzDIxLf+6+cVsR6hwGHSBkyV/ChycNY/8X92tESh7Yr1hD62
RZCOqKMFRQmeSRga5yeY1lmZn/ja/opCz0DEUojtZr4iu4MqS4LOdtKSfqvGFO7f
o591paT9/L5sHcmsrat3+ZTVSwJebMad3UIqKXJA/chmVxR6IWEcCbu2X+Su5Mnd
I27phlrG9CbietZ11r06JBY/ZHNkHtoc++atPkGzhc1ZnQ8xEWHAVcHXkJx8X1h+
UvEzNB0RczY1FryHbLlBzYPbbQOxK1NrcnCRdzAsPkzaVAbaiVkJWoDXnqRs+f5a
kk9hC0xXibs5Un/16d33xNl3P6j+21iFKamDom95eaSagzmigOW3ir3ziVTPuW4L
b991v0Aqe/xkdgMF7UH9FXd19PFW93HxNz2fL2C5Wmvq8DVhi1jM71sNUiHpPN+V
2NRHI68DVD8B458kZKQ7G5EF19sE3uCBZlwnNWUPx45xPXHTtFSChTUfuiCLgT5Z
ZBeBKWiCDLpp/LpgXLCT3BwEW3T/yguJ1yQMX8ZiNtpk9ApOpSQePd/VZG2pPHNT
-----END RSA PRIVATE KEY-----`
        let data = {
            tenant:"sys",
            username:"admin",
            password:"Admin_1234"
        }
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            httpsAgent: new https.Agent({
              keepAlive:true,
              timeout:60000,
              cert: crt,
              key: key,
              passphrase: 'Admin_1234',
              rejectUnauthorized:false
            }),
            maxRedirects: 0,
            validateStatus: (status) => {
              return status >= 200 && status < 300; // Reject only if the status code is outside the 2xx range
            }
          };
          const responseObservable = await this.httpService.post(url, data, config);
          const response = await firstValueFrom(responseObservable);
        //   console.log(response.data.result['access-token']);
          console.log("RegisterHostAdministrator")
          return response.data.result['access-token']
        } catch (error) {
            console.error(error);
            return error
        }
        
    }
    // private async  CreateSite() : Promise<any>{
    //     console.log("CreateSite")

    // }
    private async RegisterAppletDevelopers(accessToken:string) : Promise<any>{
        try {
        const url='http://10.175.114.205:32091/miniprogram/inner/register/developer'
        const rand= Math.random().toString()
        let data = { 
         customerId: "bbbb"+rand,
         name: "test",
         email: "test@Huawei.com",
         companyName: "TestCompany"+rand,
         languageLocaleKey: "en_US",
         userName: "test"+rand,
         companyScale: "",
         occupation: "",
         datanode:"",
         password:"Huawei12#$",
         phone:"123456789"
      }
      console.log("==================RegisterAppletDevelopers=============")
      console.log(data)
      console.log("==================RegisterAppletDevelopers=============")
      const config = {
            headers: {
              'Content-Type': 'application/json',
              'access-token':accessToken
            },
            maxRedirects: 0,
            validateStatus: (status) => {
              return status >= 200 && status < 300; // Reject only if the status code is outside the 2xx range
            }
          };
          const responseObservable = await this.httpService.post(url, data, config);
          const response = await firstValueFrom(responseObservable);
          console.log("RegisterAppletDevelopers")
          return response.data.content.tenantID
        } catch (error) {
            console.log(error)
        }

    }
    private async JoinSite(accessToken:string,tenantId:string) : Promise<any>{
        try {
            const url='http://10.175.114.205:32091/miniprogram/inner/joinSite'
            // const url='http://7.213.201.251:32091/miniprogram/inner/site/join'
        let data = {
        tenantId: tenantId,
        relateSiteId:"eb79bbd23ae84d058f71927f4b703ad3",
        teamName: "Developer team name",
        enterpriseName: "TestCompany",
        industry: "Industry" ,
        enterpriseWebsite:"https://www.huawei.com/en/",
        contactName:"TestCompany",
        contactNumber:"123456789",
        contactEmail:"test@Huawei.com",
        needApproval : false
    }
    
    console.log("==================JoinSite=============")
    console.log(data)
    console.log("==================JoinSite=============")
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'access-token':accessToken
        },
        maxRedirects: 0,
        validateStatus: (status) => {
          return status >= 200 && status < 300; // Reject only if the status code is outside the 2xx range
        }
      };
      const responseObservable = await this.httpService.post(url, data, config);
      const response = await firstValueFrom(responseObservable);
      return response.data
        } catch (error) {
            console.error(error)
        }
        

    }
}
