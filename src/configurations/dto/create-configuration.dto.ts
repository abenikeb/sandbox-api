import { IsNotEmpty, Length} from 'class-validator';
export class CreateConfigurationDto {
    @IsNotEmpty()
    user_id:string
    // @IsNotEmpty()
    // fabric_app_id:string;

    // @IsNotEmpty()
    // app_secret:string;

    // @IsNotEmpty()
    // merchant_id:string;

    // @IsNotEmpty()
    // @Length(4,6)
    // short_code:string;
}

