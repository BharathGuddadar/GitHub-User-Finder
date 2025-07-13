// src/components/RepoList.tsx
import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchRepos, nextPage } from "../redux/slices/repoSlice";
import Loader from "./Loader";
import Error from "./Error";

const RepoList = () => {
  /* Redux hooks*/
  const dispatch = useDispatch<AppDispatch>();

  /* repos slice */
  const { repos, loading, error, page, hasMore } = useSelector(
    (state: RootState) => state.repos
  );

  /* username comes from user slice (we stored it earlier) */
const usernameFromStore = useSelector((state: RootState) => state.user.username);
const profileUsername = useSelector((state: RootState) => state.user.profile?.login);
const username = usernameFromStore || profileUsername;


  /*     Infinite‑scroll sentinel*/
  const observer = useRef<IntersectionObserver | null>(null);

  const lastRepoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;              // don't observe during fetch
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(nextPage());         // bump page → triggers fetch
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch]
  );

  /* Fetch when username or page changes */
  useEffect(() => {
    if (username) {
      dispatch(fetchRepos({ username, page }));
    }
  }, [dispatch, username, page]);

  /* Early returns*/
  if (loading && page === 1) return <Loader />;
  if (error) return <Error />;

  if (repos.length === 0) {
    return (
      <div className="mt-8 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Public Repositories
          </h3>
          <p className="text-gray-600">
            This user doesn't have any public repositories yet.
          </p>
        </div>
      </div>
    );
  }

  /*  Helpers (unchanged) */
  const languageColors: Record<string, string> = {
    JavaScript: "bg-yellow-100 text-yellow-800 border-yellow-200",
    TypeScript: "bg-blue-100 text-blue-800 border-blue-200",
    Python: "bg-green-100 text-green-800 border-green-200",
    HTML: "bg-orange-100 text-orange-800 border-orange-200",
    CSS: "bg-purple-100 text-purple-800 border-purple-200",
    Java: "bg-red-100 text-red-800 border-red-200",
    Go: "bg-cyan-100 text-cyan-800 border-cyan-200",
    "C++": "bg-pink-100 text-pink-800 border-pink-200",
    Shell: "bg-gray-100 text-gray-800 border-gray-200",
    PHP: "bg-indigo-100 text-indigo-800 border-indigo-200",
    Ruby: "bg-red-100 text-red-800 border-red-200",
    Swift: "bg-orange-100 text-orange-800 border-orange-200",
    Kotlin: "bg-purple-100 text-purple-800 border-purple-200",
    Rust: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  /*  Render (original markup retained)*/
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Repositories</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {repos.map((repo, idx) => {
              const isLast = idx === repos.length - 1;
              return (
                <div
                  key={repo.id}
                  ref={isLast ? lastRepoRef : null} //  sentinel
                 className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-4 sm:p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"

                >
                  {/* ─── your existing repo card markup ─── */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-semibold text-blue-600 hover:text-blue-800 group-hover:underline truncate"
                        >
                          {repo.name}
                        </a>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {repo.description || "No description provided"}
                      </p>

                      <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                        {repo.language && (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                              languageColors[repo.language] ||
                              "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-current opacity-75 mr-2" />
                            {repo.language}
                          </span>
                        )}

                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{formatNumber(repo.stargazers_count)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        View
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom loader (for next pages) */}
            {loading && page > 1 && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoList;
