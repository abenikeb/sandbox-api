import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AppcubeServiceService {
    constructor(private readonly httpService: HttpService) {}
    private readonly BASE_URL:string = ""
    async setUpManagementConsole(){
        return this.RegisterHostAdministrator()
        .then(()=>{this.CreateSite()
            .then(()=>{this.RegisterAppletDevelopers()
                .then(()=>{this.FranchiseSite()
                    .then(()=>{console.log("SETUP SUCCESSFULL")})
                    .catch(()=>{console.log("FAILED TO SETUP MANAGEMENT CONSOLE")})})})})
    }
    private async RegisterHostAdministrator(): Promise<any> {
        console.log("RegisterHostAdministrator")
    }
    private async  CreateSite() : Promise<any>{
        console.log("CreateSite")

    }
    private async RegisterAppletDevelopers() : Promise<any>{
        console.log("RegisterAppletDevelopers")

    }
    private async FranchiseSite() : Promise<any>{
        console.log("FranchiseSite")

    }
}
