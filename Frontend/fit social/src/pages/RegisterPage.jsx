import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow icon
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    userName : "",
    userBio :"",
    email : "",
    gym_joined : "",
    password : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setUploadPhoto(file)

    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user/register`

    try {
        const response = await axios.post(URL,data)
        console.log("response",response)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              name : "",
              userName : "",
              userBio :"",
              email : "",
              gym_joined : "",
              password : "",
              profile_pic : ""
            })

            navigate('/email')

        }
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    console.log('data',data)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 to-red-900 p-4 font-cambria">
      <div className="absolute top-4 left-4">
        <Link to="/email">
          <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-full p-2 flex items-center shadow-lg hover:bg-opacity-40 transition">
            <FaArrowLeft className="text-white text-2xl" /> {/* Use FaArrowLeft icon */}
          </div>
        </Link>
      </div>
      <div className="w-full max-w-5xl bg-white bg-opacity-30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-2/3 p-8">
        <h3 className="text-3xl font-bold text-white mb-6 italic">
  Welcome to FitSocially App!
</h3>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-white">Name:</label>
                <input
                  type="text" id="name" name="name" placeholder="Enter your name"
                  className="bg-white bg-opacity-20 px-3 py-2 rounded-md text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.name} onChange={handleOnChange} required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="userName" className="text-white">Username:</label>
                <input
                  type="text" id="userName" name="userName" placeholder="Enter your Unique Username"
                  className="bg-white bg-opacity-20 px-3 py-2 rounded-md text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.userName} onChange={handleOnChange} required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="userBio" className="text-white">Bio:</label>
              <input
                type="text" id="userBio" name="userBio" placeholder="Enter your Bio"
                className="bg-white bg-opacity-20 px-3 py-2 rounded-md text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.userBio} onChange={handleOnChange} required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-white">Email:</label>
                <input
                  type="email" id="email" name="email" placeholder="Enter your email"
                  className="bg-white bg-opacity-20 px-3 py-2 rounded-md text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.email} onChange={handleOnChange} required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="gym_joined" className="text-white">Gym Name:</label>
                <input
                  type="text" id="gym_joined" name="gym_joined" placeholder="Enter your gym name"
                  className="bg-white bg-opacity-20 px-3 py-2 rounded-md text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.gym_joined} onChange={handleOnChange} required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-white">Password:</label>
              <input
                type="password" id="password" name="password" placeholder="Enter your password"
                className="bg-white bg-opacity-20 px-3 py-2 rounded-md text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.password} onChange={handleOnChange} required
              />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor='profile_pic'>Photo :

                  <div className='h-14 bg-slate-200 bg-opacity-25 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
              </div>

            <button className="bg-blue-600 text-lg px-4 py-2 hover:bg-blue-700 rounded-md mt-4 font-bold text-white leading-relaxed tracking-wide transition duration-300 ease-in-out">
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-white">
            Already have an account? <Link to="/email" className="hover:text-blue-300 font-semibold">Login</Link>
          </p>
        </div>
        <div className="md:w-1/3 relative overflow-hidden">
          <img
            src="https://247fitness.co/public/uploads/blog-image/1512426536.jpg"
            alt="Fitness"
            className="opacity-75 absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-blue-600 opacity-65"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-4xl font-bold text-white text-center">
              Join the<br />Fitness Community
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage
