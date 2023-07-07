import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';
export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  author_id: mongoose.Schema.Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsDate()
  updated_at: Date;

  @IsNumber()
  upVote: number;

  @IsNumber()
  downVote: number;
}
