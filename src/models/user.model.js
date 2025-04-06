import mongoose, {Schema} from mongoose
const userSchema = new Schema({
    username : {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim : true,
        index: true,
    },
    email : {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim : true,
    },
    fullname :{
        type: String,
        required : true,
        trim : true,
        index: true
    }, 
    avatar: {
        type : String ,//Cloudanary URL
        required : true,
    },
    coverImage: {
        type : String 
    },
    watchHistory : [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password:{
        type: String,
        required: true
    },
    refreshToken: {
        type:String
    }
}, {timestamps : true})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id, 
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)