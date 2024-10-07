import React, { useEffect } from 'react'
import Rightsidebar from '../components/Rightsidebar'
import Leftsidebar from '../components/Leftsidebar'
import Createpost from '../components/Createpost'
import { useSelector } from 'react-redux'
import useGetMyTweet from '../hooks/useGetMyTweet'
import useOtherUser from '../hooks/useOtherUser'
import { useNavigate } from 'react-router-dom'
import Feed from '../components/Feed'


const Social = () => {

    const{ user,otheruser}=useSelector(store=>store.user)


  const navigate = useNavigate();

  // useEffect(()=>{
  //   if (!user) {
  //     navigate("/email");
  //   }
  // },[user]);

  useOtherUser(user?._id)
  useGetMyTweet(user?._id)

  return (
    <div className='flex    '>
    {/* <Leftsidebar/> */}
    <Feed/>
    <Rightsidebar otheruser={otheruser}/>
    
    </div>
  )
}

export default Social
