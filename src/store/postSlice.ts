import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IPostState, IPostData } from "./types";

export const fetchPost = createAsyncThunk("https://jsonplaceholder.typicode.com/posts", async ( userId: number ) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
    return response.json();
  });

  const initialState: IPostState = {
    postsData: [],
    loading: false,
    error: "",
  };

  export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      setLoading: (state, {payload}:PayloadAction<boolean>) => {
        state.loading = payload;
      },
  
      addPosts: (state, {payload}:PayloadAction<IPostData[]>) => {
        state.postsData = payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPost.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPost.fulfilled, (state, action) => {
          console.log(action.payload)
          state.postsData = action.payload;
          state.loading = false;
        })
        .addCase(fetchPost.rejected, (state, action) => {
          state.loading = false;
          state.error =
            "Something went wrong; please review your server connection!";
        });
    },
  });

  export const { addPosts } = postSlice.actions;
  
  export default postSlice.reducer;