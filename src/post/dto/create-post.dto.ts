import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  author_id: string;
  @IsDate()
  @IsNotEmpty()
  created_at: Date;
  @IsDate()
  updated_at: Date;
}
