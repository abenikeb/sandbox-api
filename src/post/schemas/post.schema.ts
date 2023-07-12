import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type PostDocument = HydratedDocument<Post>;
@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author_firstName: string;

  @Prop({ required: true })
  author_lastName: string;

  @Prop({ required: true })
  created_at: Date;

  @Prop({ required: true })
  updated_at: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author_id: User;

  @Prop()
  upVote: number;

  @Prop()
  downVote: number;
}
export const PostSchema = SchemaFactory.createForClass(Post);
