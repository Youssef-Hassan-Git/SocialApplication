import { BASE_URL } from "@/app/_constants/baseURL";
import { PostComment, Posts } from "@/app/_interfaces/PostsInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  allPosts: Posts[] | null;
  loading: boolean;
  error: any | null;
  selectedPost: Posts | null;
  comments: PostComment[] | null;
  likes: any | null;
  myPosts: Posts[] | null;
} = {
  allPosts: null,
  loading: false,
  error: null,
  selectedPost: null,
  comments: [],
  likes: null,
  myPosts: null,
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  (limit: number = 30, { rejectWithValue }) => {
    return axios
      .get<{ data: { posts: Posts[] } }>(`${BASE_URL}/posts?limit=${limit}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log("API DATA:", res.data.data.posts);
        return res.data.data.posts;
      })
      .catch((err) => {
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong",
        );
      });
  },
);
export const specificPost = createAsyncThunk(
  "posts/getPost",
  (id: string, { rejectWithValue }) => {
    return axios
      .get<{ data: { post: Posts } }>(`${BASE_URL}/posts/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log("API DATA:", res.data.data.post);
        return res.data.data.post;
      })
      .catch((err) => {
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong",
        );
      });
  },
);

export const getComments = createAsyncThunk(
  "posts/getComments",
  (postId: string, { rejectWithValue }) => {
    return axios
      .get(`${BASE_URL}/posts/${postId}/comments`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data.data.comments);
        return res.data.data.comments;
      })
      .catch((err) => {
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong",
        );
      });
  },
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}/posts/${postId}/like`,
        null,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      );

      return data;
    } catch (err: any) {
      console.log("LIKE ERROR:", err.response?.data);

      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const getLikes = createAsyncThunk(
  "posts/getLikes",
  async (
    {
      postId,
      page = 1,
      limit = 20,
    }: {
      postId: string;
      page?: number;
      limit?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/posts/${postId}/likes?page=${page}&limit=${limit}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      );

      return data.data.likes;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const getMyPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });

      console.log("API RESPONSE:", data);

      return data.data.posts;
    } catch (error: any) {
      console.log(error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletepost",
  (postId, { rejectWithValue }) => {
    return axios
      .delete(`${BASE_URL}/posts/${postId}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })

      .then((res) => res.data.data.post)
      .catch((err) => {
        return rejectWithValue(
          err.response?.data?.message || "Something went wrong",
        );
      });
  },
);

export const createComment = createAsyncThunk(
  "posts/createComment",
  async (
    {
      postId,
      content,
    }: {
      postId: string;
      content: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post<{
        data: {
          comment: PostComment;
        };
      }>(
        `${BASE_URL}/posts/${postId}/comments`,
        { content },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      );

      return data.data.comment;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const sharePost = createAsyncThunk(
  "posts/sharePost",
  async (
    {
      postId,
      body,
    }: {
      postId: string;
      body: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/posts/${postId}/share`,
        { body },
        {
          headers: {
            token: localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
        },
      );

      return data.data.post;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })

      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder.addCase(specificPost.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });

    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.comments?.unshift(action.payload);
    });

    builder.addCase(getLikes.fulfilled, (state, action) => {
      state.likes = action.payload;
    });

    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      state.myPosts = action.payload;
      console.log(state.myPosts);
    });
    builder.addCase(getMyPosts.rejected, (state, action) => {
      state.error = action.payload;
      console.log(state.error);
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      const deletedId = action.payload.id;

      state.allPosts =
        state.allPosts?.filter((post) => post.id !== deletedId) ?? null;

      state.myPosts =
        state.myPosts?.filter((post) => post.id !== deletedId) ?? null;
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.payload;
      console.log(state.error);
    });
    builder.addCase(sharePost.fulfilled, (state, action) => {
      state.allPosts?.unshift(action.payload);

      state.myPosts?.unshift(action.payload);
    });
  },
});

export default postsSlice.reducer;
