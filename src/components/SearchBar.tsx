import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { fetchUser, clearUser } from "../redux/slices/userSlice";
import { fetchRepos, clearRepos, resetPage } from "../redux/slices/repoSlice";
import { useState, useEffect, useRef, useCallback } from "react";
import { searchUsers } from "../services/githubApi";
import debounce from "lodash.debounce";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
}

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [suggestions, setSuggestions] = useState<GitHubUser[]>([]);
  const [suggestionPage, setSuggestionPage] = useState(1);
  const [hasMoreSuggestions, setHasMoreSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const suggestionBoxRef = useRef<HTMLUListElement | null>(null);

  // 🔁 Debounced fetch function
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setSuggestionPage(1);
      setIsSearching(true);
      try {
        const { users, hasMore } = await searchUsers(query, 1);
        setSuggestions(users);
        setHasMoreSuggestions(hasMore);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Suggestion error:", err);
        setShowSuggestions(false);
      } finally {
        setIsSearching(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    fetchSuggestions(username);
  }, [username]);

  // 🔁 Infinite scroll inside suggestion box
  useEffect(() => {
    const box = suggestionBoxRef.current;
    if (!box) return;

    const handleScroll = () => {
      if (
        box.scrollTop + box.clientHeight >= box.scrollHeight - 10 &&
        hasMoreSuggestions
      ) {
        const nextPage = suggestionPage + 1;
        searchUsers(username, nextPage).then(({ users, hasMore }) => {
          setSuggestions((prev) => [...prev, ...users]);
          setSuggestionPage(nextPage);
          setHasMoreSuggestions(hasMore);
        });
      }
    };

    box.addEventListener("scroll", handleScroll);
    return () => box.removeEventListener("scroll", handleScroll);
  }, [suggestionPage, hasMoreSuggestions, username]);

  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    // Cancel any pending debounced function calls
    fetchSuggestions.cancel();
    
    setUsername(value);
    setSuggestions([]);
    setShowSuggestions(false);
    setHasMoreSuggestions(false);
    setSuggestionPage(1);
    
    dispatch(clearUser());
    dispatch(clearRepos());
    dispatch(resetPage());
    dispatch(fetchUser(value));
    dispatch(fetchRepos({ username: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    
    if (!value.trim()) {
      fetchSuggestions.cancel();
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(username);
    }
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target as Node)) {
        fetchSuggestions.cancel();
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fetchSuggestions]);

  return (
    <div className="relative flex flex-col items-center justify-center mt-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          GitHub User Finder 
        </h1>
        <p className="text-gray-600 text-lg">
          Discover GitHub users and explore their repositories
        </p>
      </div>

      {/* Search Container */}
      <div className="relative w-full max-w-md">
        <div className="relative">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            />
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <ul
                ref={suggestionBoxRef}
                className="bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto"
              >
                {suggestions.map((user, index) => (
                  <li
                    key={user.id}
                    onClick={() => handleSearch(user.login)}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                      index === 0 ? 'rounded-t-xl' : ''
                    } ${index === suggestions.length - 1 && !hasMoreSuggestions ? 'rounded-b-xl' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="w-10 h-10 rounded-full border-2 border-gray-100"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{user.login}</div>
                        <div className="text-sm text-gray-500">GitHub User</div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </li>
                ))}
                {hasMoreSuggestions && (
                  <li className="text-center text-sm py-3 text-gray-500 bg-gray-50 rounded-b-xl">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                      Loading more...
                    </div>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* No Results Message */}
          {showSuggestions && suggestions.length === 0 && username.trim().length >= 2 && !isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-500">No users found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different username</p>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={() => handleSearch(username)}
          disabled={!username.trim()}
          className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search GitHub User
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-3">Try searching for:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['torvalds', 'octocat', 'gaearon', 'addyosmani', 'tj'].map((username) => (
            <button
              key={username}
              onClick={() => handleSearch(username)}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors duration-150"
            >
              {username}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;