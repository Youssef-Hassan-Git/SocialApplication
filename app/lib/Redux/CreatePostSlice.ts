import { BASE_URL } from "@/app/_constants/baseURL";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



interface CreatePostState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CreatePostState = {
  loading: false,
  error: null,
  success: false,
};

export const createPost = createAsyncThunk("posts/createPost", 
  
  (formData: FormData, {rejectWithValue}) =>{

   return axios.post(`${BASE_URL}/posts`, formData, {
    headers:{
      token: localStorage.getItem("userToken")
    }
   }).then((res) => {return res.data})
   .catch((err) => { return rejectWithValue(err.response?.data?.message || "Something went wrong")})

  
  })

  const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    resetCreatePost: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        
      })

      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});


export const { resetCreatePost } = createPostSlice.actions;

export default createPostSlice.reducer;