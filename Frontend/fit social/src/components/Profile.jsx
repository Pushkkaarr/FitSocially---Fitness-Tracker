import React, { useState } from "react";
import Avatar from "react-avatar";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { Heart, MessageCircle, Upload } from "lucide-react";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import { followingUpdate } from "../redux/userSlice";
// import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import axios from "axios";
import { getRefresh } from "../redux/tweetSlice";
import { CiImageOn } from "react-icons/ci";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  useGetProfile(id);

  const { tweets } = useSelector((store) => store.tweet);

  // Filter tweets by userId
  const userTweets = tweets.filter((tweet) => tweet.userId === id);

  const [isFollowing, setIsFollowing] = useState(user.following.includes(id));
  const [targetCalories, setTargetCalories] = useState("2000");
  const [newPostCaption, setNewPostCaption] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, image: "/placeholder.svg?height=300&width=300", caption: "Just finished a great workout!", likes: 120, comments: 15 },
    { id: 2, image: "/placeholder.svg?height=300&width=300", caption: "Meal prep for the week", likes: 89, comments: 7 },
    { id: 3, image: "/placeholder.svg?height=300&width=300", caption: "New personal best!", likes: 230, comments: 31 },
  ]);

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // Unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/unfollow/${id}`, { id: user?._id });
        dispatch(followingUpdate(id));
        console.log(tweets);
        
        dispatch(getRefresh());
        toast.success(res.data.message);
        setIsFollowing(false);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // Follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/follow/${id}`, { id: user?._id });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
        setIsFollowing(true);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    }
  };

  const handleSaveCalories = async () => {
    try {
      axios.defaults.withCredentials = true; // Ensure credentials are included
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/updateCalories`, {
        userId: user._id,
        targetCalories,
      });
      toast.success(res.data.message); // Show success message
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update calories');
      console.error('Error saving target calories:', error);
    }
  };

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      image: "/placeholder.svg?height=300&width=300",
      caption: newPostCaption,
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostCaption("");
  };

  

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
         
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <Avatar src={profile?.profile_pic} size="128" round={true} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{profile?.name || "Jane Doe"}</h1>
            <p className="text-gray-500">{"@"+profile?.userName || "@janedoe"}</p>
            <p className="mt-2">{profile?.userBio || "Fitness enthusiast | Healthy living advocate | Software developer"}</p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <span className="text-blue-500"><strong>{profile?.followers?.length || 0}</strong> Followers</span>
              <span className="text-blue-500"><strong>{profile?.following?.length || 0}</strong> Following</span>
            </div>
          </div>
          {profile?._id === user?._id ? (
           <span></span>
          ) : (
            <button 
              onClick={followAndUnfollowHandler}
              className={`px-4 py-1 ${isFollowing ? 'border border-gray-300' : 'bg-black text-white'} rounded-full`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {/* Daily Target Calories */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Daily Target Calories</h2>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={targetCalories}
            onChange={(e) => setTargetCalories(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 max-w-[200px]"
          />
          <span className="text-gray-500">calories</span>
          <button 
            onClick={handleSaveCalories}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>

      {/* Posts */}
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {userTweets.length > 0 ? (
    userTweets.map((tweet) => (
      <div key={tweet._id} className="bg-white rounded-lg shadow">
        <div className="p-4">
          {/* Display tweet image if it exists */}
          {tweet.image && (
            <img
              src={tweet.image}
              alt={<CiImageOn />}
              className="w-full h-auto object-cover rounded-lg mb-2"
            />
          )}
          <p className="mb-2">{tweet.description}</p>
          <div className="flex justify-between items-center">
            <button className="text-gray-500 flex items-center">
              <Heart className="mr-2 h-4 w-4" /> {tweet.likes.length || 0}
            </button>
           
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No tweets available for this user.</p>
  )}
</div>

    </div>
  );
};

export default Profile;
