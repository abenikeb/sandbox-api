import { IsNotEmpty ,Length} from 'class-validator';
export class CreateMokeApiDto {
    @IsNotEmpty()
    timestamp:EpochTimeStamp
    @IsNotEmpty()
    @Length(32)
    nonce_str:string
    @IsNotEmpty()
    method:string
    @IsNotEmpty()
    version:string 
}
