import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users";
import accountsReducer from "../slices/account";
import transactionsReducer from "../slices/transactions";

// store
const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer,
    transactions: transactionsReducer,
  },
});

export default store;
