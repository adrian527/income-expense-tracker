import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseUrl";

// initial state
const initialState = {
  loading: false,
  error: "",
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: "",
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
  },
};

// createAsyncThunk
// register

export const registerUserAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${baseURL}/users/register`,
        {
          fullname: payload.fullname,
          email: payload.email,
          password: payload.password,
        },
        config
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${baseURL}/users/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        config
      );

      //  save user local storage
      localStorage.setItem("userInfo", JSON.stringify(res.data));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logOutUserAction = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("userInfo");
  return null;
});

// get profile

export const getProfileAction = createAsyncThunk(
  "user/getProfile",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //  get the token
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // make a request
      const resp = await axios.get(`${baseURL}/users/profile`, config);

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });

    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });

    // login

    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });

    builder.addCase(logOutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = null;
    });

    // get profile
    builder.addCase(getProfileAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });

    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = {};
    });
  },
});

// generate reducer

const usersReducer = usersSlice.reducer;

export default usersReducer;
