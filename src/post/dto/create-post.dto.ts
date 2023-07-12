import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';
export class CreatePostDto {
  // @IsNotEmpty()
  // @IsNumber()
  // id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  author_id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  author_firstName: string;

  @IsNotEmpty()
  author_lastName: string;

  // @IsDate()
  @IsNotEmpty()
  created_at: Date;

  // @IsDate()
  @IsNotEmpty()
  updated_at: Date;

  @IsNumber()
  upVote: number;

  @IsNumber()
  downVote: number;
}
