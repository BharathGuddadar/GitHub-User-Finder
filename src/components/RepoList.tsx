import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Loader from "./Loader";
import Error from "./Error";


const RepoList = () => {
  const { repos, loading, error } = useSelector((state: RootState) => state.repos);

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
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const now = new Date();
  //   const diffTime = Math.abs(now.getTime() - date.getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
  //   if (diffDays === 1) return 'yesterday';
  //   if (diffDays < 7) return `${diffDays} days ago`;
  //   if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  //   if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  //   return `${Math.floor(diffDays / 365)} years ago`;
  // };
if (loading) return <Loader />;
if (error) return <Error />;
//if (error) return <Error title="Failed to Load Repositories" message="There was an error fetching the repositories. Please try again later." />;

  if (repos.length === 0) {
    return (
      <div className="mt-8 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Public Repositories</h3>
          <p className="text-gray-600">This user doesn't have any public repositories yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Repositories</h2>
            {/* <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white font-semibold">{repos.length}</span>
            </div> */}
          </div>
        </div>

        {/* Repository List */}
        <div className="p-6">
          <div className="grid gap-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="group bg-gray-50 hover:bg-gray-100 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Repository Name */}
                    <div className="flex items-center space-x-3 mb-3">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                      </svg>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-blue-600 hover:text-blue-800 group-hover:underline truncate"
                      >
                        {repo.name}
                      </a>
                      {/* {repo.private && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Private
                        </span>
                      )} */}
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {repo.description || "No description provided"}
                    </p>

                    {/* Stats and Info */}
                    <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                      {repo.language && (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            languageColors[repo.language] || "bg-gray-100 text-gray-800 border-gray-200"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current opacity-75 mr-2"></span>
                          {repo.language}
                        </span>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{formatNumber(repo.stargazers_count)}</span>
                      </div>

                      {/* <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>{formatNumber(repo.forks_count)}</span>
                      </div> */}

                      {/* <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Updated {formatDate(repo.updated_at)}</span>
                      </div> */}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-sm"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoList;