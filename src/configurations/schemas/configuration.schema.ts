import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type ConfigurationDocument = HydratedDocument<Configuration>;

@Schema()
export class Configuration {
  @Prop({ required: true })
  fabric_app_id: string;

  @Prop({ required: true })
  app_secret: string;

  @Prop({ required: true })
  merchant_id: string;

  @Prop({ required: true })
  short_code: string;

  @Prop({ required: true })
  private_key: string;

  @Prop({ required: true })
  public_key: string;

  //   @Prop({ required: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  //   user_id: User;
}
export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
