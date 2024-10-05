import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id : "",
  name : "",
  email : "",
  profile_pic : "",
  token : "",
  onlineUser : [],
  socketConnection : null,
  user: null,
  otheruser: null,
  profile: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state,action) => {
      state._id = action.payload._id
      state.name = action.payload.name 
      state.email = action.payload.email 
      state.profile_pic = action.payload.profile_pic 
      state.user = action.payload  // store full user info
    },
    setToken : (state,action) => {
      state.token = action.payload
    },
    logout : (state) => {
      state._id = ""
      state.name = ""
      state.email = ""
      state.profile_pic = ""
      state.token = ""
      state.socketConnection = null
      state.user = null
      state.otheruser = null
      state.profile = null
    },
    setOnlineUser : (state,action) => {
      state.onlineUser = action.payload
    },
    setSocketConnection : (state,action) => {
      state.socketConnection = action.payload
    },
    getUser: (state,action) => {
      state.user = action.payload
    },
    getOtherUser: (state,action) => {
      state.otheruser = action.payload
    },
    getMyProfile: (state,action) => {
      state.profile = action.payload
    },
    followingUpdate: (state,action) => {
      // unfollow
      if (state.user?.following?.includes(action.payload)) {
        state.user.following = state.user.following.filter(itemId => itemId !== action.payload)
      } else {
        // follow
        state.user.following.push(action.payload)
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout, setOnlineUser, setSocketConnection, getUser, getOtherUser, getMyProfile, followingUpdate } = userSlice.actions

export default userSlice.reducer
