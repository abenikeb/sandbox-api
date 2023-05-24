import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export type ConfigurationDocument = HydratedDocument<Configuration>;
@Schema()
export class Configuration {
    @Prop({ required: true })
    fabric_app_id:string;

    @Prop({ required: true })
    app_secret:string;
 
    @Prop({ required: true })
    merchant_id:string;
    @Prop({ required: true })
    short_code:string;
    @Prop({ required: true })
    private_key:string;
    @Prop({ required: true })
    public_key:string;
    @Prop({ required: true, type: User})
    user_id:User;
    @Prop({ required: true })
    token:string;
    @Prop({ required: true })
    order_id:string;
}
export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);