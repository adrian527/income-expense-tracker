import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../utils/baseUrl";

const initialState = {
  transactions: [],
  transaction: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
};

export const createTransactionAction = createAsyncThunk(
  "transaction/create",
  async (payload, { rejectWithValue, getState }) => {
    const { name, id, transactionType, amount, category, notes } = payload;

    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.post(
        `${baseURL}/transactions`,
        {
          name,
          account: id,
          transactionType,
          amount,
          category,
          notes,
        },
        config
      );

      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

export const updateTransactionAction = createAsyncThunk(
  "transaction/update",
  async (payload, { rejectWithValue, getState }) => {
    const { name, id, transactionType, amount, category, notes } = payload;

    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.put(
        `${baseURL}/transactions/${id}`,
        {
          name,
          account: id,
          transactionType,
          amount,
          category,
          notes,
        },
        config
      );

      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

export const fetchTransactionAction = createAsyncThunk(
  "transaction/fetch",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;

      // pass token to header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const resp = await axios.get(
        `${baseURL}/transactions/${payload}`,
        config
      );

      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response.message);
    }
  }
);

const transactionsSlicer = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTransactionAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.transaction = action.payload;
    });

    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.transaction = null;
      state.error = action.payload;
    });

    // update
    builder.addCase(updateTransactionAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.transaction = action.payload;
    });

    builder.addCase(updateTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.transaction = null;
      state.error = action.payload;
    });

    // get
    builder.addCase(fetchTransactionAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchTransactionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });

    builder.addCase(fetchTransactionAction.rejected, (state, action) => {
      state.loading = false;
      state.transaction = null;
      state.error = action.payload;
    });
  },
});

const transactionsReducer = transactionsSlicer.reducer;

export default transactionsReducer;
