import { IsNotEmpty, IsUrl } from 'class-validator';
export class UpdateNotifyDto {
  @IsNotEmpty()
  @IsUrl()
  notify_url: string;
}
