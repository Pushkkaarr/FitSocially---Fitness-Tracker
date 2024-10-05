import React from 'react'
import Rightsidebar from '../components/Rightsidebar'
import Leftsidebar from '../components/Leftsidebar'
import Createpost from '../components/Createpost'

const Social = () => {
  return (
    <div className='flex mx-auto w-[80%] gap-[5%] justify-between '>
    <Leftsidebar/>
    <Createpost/>
    <Rightsidebar/>
    
    </div>
  )
}

export default Social
