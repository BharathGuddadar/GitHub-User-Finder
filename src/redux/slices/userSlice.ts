import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../services/githubApi";

interface UserState {
  loading: boolean;
  error: string | null;
  profile: any;
}

const initialState: UserState = {
  loading: false,
  error: null,
  profile: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username: string, { rejectWithValue }) => {
    try {
      const data = await fetchUserProfile(username);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.status || "Unknown error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
