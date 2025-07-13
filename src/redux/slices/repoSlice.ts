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
  page: number;          // current page already fetched
  hasMore: boolean;      // true ⇢ more pages available
}

const initialState: RepoState = {
  loading: false,
  error: null,
  repos: [],
  page: 1,
  hasMore: true,
};

// Async thunk – page param defaults to 1
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
            per_page: 10,      // keep in sync with hasMore logic below
            page,
            sort: "updated",
          },
        }
      );
      return res.data as Repo[];
    } catch (err: any) {
      return rejectWithValue(err.response?.status || "Unknown error");
    }
  }
);

// Slice

const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    clearRepos(state) {
      state.repos = [];
      state.error = null;
      state.page = 1;
      state.hasMore = true;
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

        // If first page replace, otherwise append
        const fetchedPage = action.meta.arg.page ?? 1;
        state.repos =
          fetchedPage === 1
            ? action.payload
            : [...state.repos, ...action.payload];

        // If fewer than per_page items returned → no more pages
        state.hasMore = action.payload.length === 10;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRepos, nextPage, resetPage } = repoSlice.actions;
export default repoSlice.reducer;
