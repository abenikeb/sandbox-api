import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type MerchantDocument = HydratedDocument<Merchant>;

@Schema()
export class Merchant {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
  
  @Prop({ type: String, required: true, unique: true })
  developerTeamName: string;
  
  @Prop({ type: String, required: true , unique: true})
  companyName: string;
  
  @Prop({ type: String, required: true })
  contactPersonName: string;
  
  @Prop({ type: String, required: true })
  contactPhone: string;
  
  @Prop({ type: String})
  contactEmail: string;
  
  @Prop({ type: String, required: true })
  officialWebsite: string;

  @Prop({ type: String, required: true })
  businessCatagory: string;
  
  @Prop({ required: true, default: "incomplete" })
  status: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ required: true, unique: true })
  short_code:Number
  
  @Prop()
  merchantAppId:string
  
  @Prop()
  fabricAppSercet:string
  
  @Prop()
  fabricAppId:string
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
