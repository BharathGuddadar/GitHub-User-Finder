import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
  timeout: 10000,
});

// ✅ 1. Fetch user profile
export const fetchUserProfile = async (username: string) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};

// ✅ 2. Fetch user repos with pagination
export const fetchUserRepos = async (
  username: string,
  page = 1,
  perPage = 10
) => {
  const response = await githubApi.get(`/users/${username}/repos`, {
    params: {
      per_page: perPage,
      page,
      sort: "updated",
    },
  });
  return response.data;
};

// ✅ 3. NEW: Search users (autocomplete)
export const searchUsers = async (query: string, page = 1, perPage = 10) => {
  const response = await githubApi.get(`/search/users`, {
    params: {
      q: query,
      page,
      per_page: perPage,
    },
  });
  return {
    users: response.data.items,
    hasMore: response.data.total_count > page * perPage,
  };
};
