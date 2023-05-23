import { IsNotEmpty } from 'class-validator';
export class ApplyFabricTokenDto {
  @IsNotEmpty()
  appSecret: string;
}
export class ApplyFabricTokenHeaderDto {
    @IsNotEmpty()
    X_APP_Key:string
}
