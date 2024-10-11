import axios from "axios"
// import {USER_API_END_POINT} from "../utils/constant"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getMyProfile } from "../redux/userSlice"


const useGetProfile=async(id)=>{
    const dispactch=useDispatch()

    useEffect(()=>{
        const fetchMyProfile=async()=>{
            try {
                const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${id}`,{
                    withCredentials:true
                })
                dispactch(getMyProfile(res.data.user))
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchMyProfile()
      
    },[id,])
   
}
export default useGetProfile