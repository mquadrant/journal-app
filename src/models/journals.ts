import mongoose,{Schema,Document} from 'mongoose';
import {IUser} from './users';

export interface IJournal extends Document{
    title:string;
    body?:string;
    userId: IUser | string
}

const journalSchema:Schema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{ timestamps: true })

export default mongoose.model<IJournal>("Journal",journalSchema);