import express from 'express';
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from '../controller/tweetController.js'
import isAuthenticated from '../config/auth.js';

const router = express.Router();

router.route("/create").post(isAuthenticated,createTweet)
router.route("/delete/:id").delete(deleteTweet)
router.route("/like/:id").put(likeOrDislike)
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);

export default router;
