import { BASE_URL } from "@/app/_constants/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userAgent } from "next/server";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
  bookmarks: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
  isLoading: false,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.get(`${BASE_URL}/users/profile-data`, {
        headers: {
          token,
        },
      });

      return res.data.data.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const uploadPhoto = createAsyncThunk(
  "profile/uploadPhoto",
  (formData: FormData, { rejectWithValue }) => {
    return axios
      .put(`${BASE_URL}/users/upload-photo`, formData, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong",
        );
      });
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(uploadPhoto.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        if(state.user){
          state.user.photo = action.payload.data.photo;
        } 
        console.log(action.payload.data.photo);
      })

      .addCase(uploadPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.log(state.error);
        
      });
  },
});

export default profileSlice.reducer;
