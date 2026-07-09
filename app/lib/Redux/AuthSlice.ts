import { BASE_URL } from "@/app/_constants/baseURL";
import { LoginFormValues } from "@/app/_interfaces/LoginInterface";
import { RegisterFormValues } from "@/app/_interfaces/RegisterInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  userToken: null | string;
  userData: any;
  ErrorMessage: string | null;
  isLoading: boolean;
  isSuccess: boolean;
} = {
  userToken: null,
  userData: null,
  ErrorMessage: null,
  isLoading: false,
  isSuccess: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginFormValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signin`, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  (payload: RegisterFormValues, { rejectWithValue }) => {
    return axios
      .post(`${BASE_URL}/users/signup`, payload)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return rejectWithValue(err.response.data.message);
      });
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // logout
    clearToken: (state) => {
      state.userData = null;
      state.userToken = null;
      localStorage.removeItem("userToken");
      state.isSuccess = false;
      state.isLoading = false;
      state.ErrorMessage = null;
    },
    setToken: (state, action) => {
    state.userToken = action.payload;
  },
    clearError: (state) => {
    state.ErrorMessage = null;
  },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload.data.user;
      const token = action.payload.data.token;
      state.userToken = token;
      localStorage.setItem("userToken", token);
      console.log("====================================");
      console.log("login success, ", state.userData);
      console.log("====================================");


    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.ErrorMessage = action.payload as string;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    // register
    builder.addCase(register.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      console.log("registered");
      state.userData = action.payload.data.user;
      const token = action.payload.data.token;
      state.userToken = token;
      localStorage.setItem("userToken", token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.ErrorMessage = action.payload as string;
    });
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
  },
});

export default authSlice.reducer;
export const { setToken, clearToken, clearError  } = authSlice.actions;