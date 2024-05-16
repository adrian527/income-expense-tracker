// initial state

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseUrl";

const initialState = {
  account: {},
  accounts: [],
  error: "",
  loading: false,
  success: false,
  isUpdated: false,
};

// action to create account / project

export const createAccountAction = createAsyncThunk(
  "account/create",
  async (payload, { rejectWithValue, getState }) => {
    const { name, initialBalance, accountType, notes } = payload;

    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.post(
        `${baseURL}/accounts`,
        {
          name,
          accountType,
          notes,
          initialBalance,
        },
        config
      );

      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

// action to create account / project

export const updateAccountAction = createAsyncThunk(
  "account/update",
  async (payload, { rejectWithValue, getState }) => {
    const { name, initialBalance, accountType, notes, id } = payload;

    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.put(
        `${baseURL}/accounts/${id}`,
        {
          name,
          accountType,
          notes,
          initialBalance,
        },
        config
      );

      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

// gets single account

export const getSingleAccountAction = createAsyncThunk(
  "account/get-details",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.get(`${baseURL}/accounts/${id}`, config);

      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createAccountAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });

    builder.addCase(createAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });

    // fetch single account

    builder.addCase(getSingleAccountAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getSingleAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.account = action.payload;
    });

    builder.addCase(getSingleAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.error = action.payload;
    });

    // update
    builder.addCase(updateAccountAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.isUpdated = true;
      state.account = action.payload;
    });

    builder.addCase(updateAccountAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.account = null;
      state.isUpdated = false;
      state.error = action.payload;
    });
  },
});

const accountsReducer = accountSlice.reducer;

export default accountsReducer;
