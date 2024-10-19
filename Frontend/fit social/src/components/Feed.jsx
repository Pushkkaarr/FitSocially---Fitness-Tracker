import React from 'react'
import Createpost from './Createpost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {
const {tweets}=useSelector(store=>store.tweet)

  return (
    <div className='w-[50%] overflow-y-scroll h-[100vh] no-scrollbar pl-8 '>
      <Createpost/>
{
  tweets?.map((tweet)=><Tweet key={tweet?._id} tweet={tweet}/>)
}

      
     
    </div>
  )
}

export default Feed
