import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa";
// import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh, getIsActive } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, useDescription] = useState("");
  const [image, setImage] = useState(null); // New state for image
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("id", user?._id);
    

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    useDescription("");
    setImage(null); // Reset image state after submission
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-evenly border-b border-gray-200 items-center">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <div className="flex items-center bg-white rounded-lg">
          <div>
            <Avatar   src={user?.profile_pic}
                    size="50"
                    round={true} 
                    className="top-[-40px]"/>
          </div>
          <div className="flex-grow ml-4">
            <textarea
              value={description}
              onChange={(e) => useDescription(e.target.value)}
              placeholder="What's happening?"
              className="w-full border-none outline-none text-lg resize-none"
            />
            <div className="flex items-center mt-4">
              <label className="cursor-pointer">
                <FaImages className="text-blue-500 text-xl" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={submitHandler}
                className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
