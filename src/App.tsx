import RepoList from "./components/RepoList";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <SearchBar />
      <UserCard />
      <RepoList/>
    </div>
  );
}

export default App;
