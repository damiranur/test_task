import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUserState, IUserData } from "./types";

export const fetchUser = createAsyncThunk("https://jsonplaceholder.typicode.com/users", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
  });

  const initialState: IUserState = {
    usersData: [],
    loading: false,
    error: "",
  };
  

  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setLoading: (state, {payload}:PayloadAction<boolean>) => {
        state.loading = payload;
      },
  
      addUsers: (state, {payload}:PayloadAction<IUserData[]>) => {
        state.usersData = payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          console.log(action.payload)
          state.usersData = action.payload;
          state.loading = false;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.loading = false;
          state.error =
            "Something went wrong; please review your server connection!";
        });
    },
  });
  
  export const { addUsers } = userSlice.actions;
  
  export default userSlice.reducer;