import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IS_ARRAY,
  IsEmpty,
  IsArray,
} from 'class-validator';
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

  @IsArray()
  replies: [
    {
      message: string;
      timestamp: Date;
      author_id: string;
    },
  ];
}
