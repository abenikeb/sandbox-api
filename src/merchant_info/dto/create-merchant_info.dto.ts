import {
    IsDate,
    IsNotEmpty,
    IsPhoneNumber,
    IsEmail,
    IsAlphanumeric,
    IsAlpha,
    isURL,
    IsUrl,
} from 'class-validator';
import mongoose from 'mongoose';
export class CreateMerchantInfoDto {
    @IsNotEmpty()
    developerTeamName: string;

    @IsNotEmpty()
    @IsAlphanumeric()

    companyName: string;
    
    @IsNotEmpty()
    contactPersonName: string;

    @IsNotEmpty()
    // @IsPhoneNumber()
    contactPhone: string;

    @IsNotEmpty()
    @IsEmail()
    contactEmail: string;

    @IsNotEmpty()
    @IsUrl()
    officialWebsite: string;

    // @IsNotEmpty()
    businessCatagory: string;

    @IsNotEmpty()
    user_id: mongoose.Schema.Types.ObjectId;

  }
  