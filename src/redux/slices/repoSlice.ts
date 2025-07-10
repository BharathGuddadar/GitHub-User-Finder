import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

interface RepoState {
  loading: boolean;
  error: string | null;
  repos: Repo[];
  page: number;
}

const initialState: RepoState = {
  loading: false,
  error: null,
  repos: [],
  page: 1,
};

// Async thunk to fetch repos
export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async (
    { username, page = 1 }: { username: string; page?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            per_page: 10,
            page,
            sort: "updated",
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.status || "Unknown error");
    }
  }
);

const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    clearRepos(state) {
      state.repos = [];
      state.error = null;
      state.page = 1;
    },
    nextPage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRepos, nextPage, resetPage } = repoSlice.actions;
export default repoSlice.reducer;
