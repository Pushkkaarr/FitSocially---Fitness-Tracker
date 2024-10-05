import axios from "axios";
// import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweet = async (id) => {
  const dispactch = useDispatch();
  const { refresh,isActive} = useSelector((store) => store.tweet);

  const fetchMyTweet = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tweet/alltweets/${id}`, {
        withCredentials: true,
      });
      dispactch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  const followingTweetHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/tweet/followingtweets/${id}`
      );
      console.log(res);
      dispactch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchMyTweet();
    } else {
      followingTweetHandler();
    }
  }, [refresh,isActive]);
};
export default useGetMyTweet;
