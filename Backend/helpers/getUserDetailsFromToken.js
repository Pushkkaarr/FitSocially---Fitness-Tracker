import jwt from 'jsonwebtoken'
import UserModel from '../models/userSchema.js'

export const getUserDetailsFromToken = async(token)=>{
    
    if(!token){
        return {
            message : "session out",
            logout : true,
        }
    }

    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)

    const user = await UserModel.findById(decode.id).select('-password') //this (-password) means that the result will not include password

    return user
}

export default getUserDetailsFromToken;