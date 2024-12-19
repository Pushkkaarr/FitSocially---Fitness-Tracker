import React from "react";
import Avatar from "react-avatar";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { CiHeart, CiBookmark } from "react-icons/ci";
import axios from "axios";
// import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";




const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation()

  const likehandler = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tweet/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
      console.log(tweet?.image);
      console.log(user?.profile_pic)
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to like the tweet");
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/delete/${id}`);
      dispatch(getRefresh());
      toast.success(res.data.message);
      console.log(tweet.image)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete the tweet");
      console.log(error);
    }
  };

  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}${tweet.image}`;

  return (
    <div className="border-b border-gray-200 bg-white rounded-lg">
      <div className="flex p-4">
        <Avatar
            src={user?.profile_pic}
           size="40"
           round={true}
        />
        <div className="ml-2 w-full">
          <div className="flex items-center">
            <h1 className="font-bold">{tweet?.userDetails[0]?.name || "Anonymous"}</h1>
            <p className="text-gray-500 text-sm ml-1">
              @{tweet?.userDetails[0]?.userName || "unknown"}
            </p>
          </div>
          <div>
            <p>{tweet.description || "No description available"}</p>
          </div>
          {tweet.image && (
            <div className="">
              <img
                src={imageUrl}
                alt="Tweet "
                className='w-full object-cover'
              />
            </div>
          )}
          <div className="flex justify-between my-3">
           
            <div className="flex items-center">
              <div
                onClick={() => likehandler(tweet?._id)}
                className="p-2 hover:bg-pink-300 rounded-full cursor-pointer"
              >
                <FaRegHeart size="24px" />
              </div>
              <p>{tweet?.likes.length || 0}</p>
            </div>
           
            {user?._id === tweet?.userId && (
              <div
                onClick={() => deleteTweetHandler(tweet?._id)}
                className="flex items-center"
              >
                <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                  <MdOutlineDeleteOutline size="24px" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
