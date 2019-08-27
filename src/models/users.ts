import mongoose,{Schema,Document} from 'mongoose';

export interface IUser extends Document{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

const userSchema:Schema = new Schema({
    firstName: {
        type: String,
        required: [true, "A user must have first name"],
        trim: true,
        maxlength: [
            40,
            "A user name must have less or equal to 40 characters",
        ],
    },
    lastName: {
        type: String,
        required:[true,"A user must have first name"],
        trim: true,
        maxlength: [
            40,
            "A user name must have less or equal to 40 characters",
        ],
    },
    email: {
        type: String,
        required:[true,"A user must have email"],
        trim: true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,"A user must have password"]
    }
},{ timestamps: true });


export default mongoose.model<IUser>('User',userSchema);