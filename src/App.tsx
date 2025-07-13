import { useState, useEffect } from "react";
import RepoList from "./components/RepoList";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds animation

    return () => clearTimeout(timer);
  }, []);

  // Add custom CSS animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .delay-1000 {
        animation-delay: 1s;
      }
      
      .delay-1500 {
        animation-delay: 1.5s;
      }
      
      .delay-2000 {
        animation-delay: 2s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Loading Screen Component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          {/* Animated Smile */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-yellow-400 rounded-full mx-auto relative animate-bounce shadow-2xl">
              {/* Eyes */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-black rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-black rounded-full animate-pulse"></div>
              
              {/* Smile */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-8 border-b-4 border-black rounded-b-full animate-pulse"></div>
              </div>
              
              {/* Sparkles around the smile */}
              <div className="absolute -top-4 -left-4 w-4 h-4 bg-white rounded-full animate-ping"></div>
              <div className="absolute -top-2 -right-6 w-2 h-2 bg-white rounded-full animate-ping delay-300"></div>
              <div className="absolute -bottom-2 -left-6 w-3 h-3 bg-white rounded-full animate-ping delay-500"></div>
              <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-white rounded-full animate-ping delay-700"></div>
            </div>
          </div>
          
          {/* Welcome Text */}
          <div className="text-white text-center space-y-4">
            <h1 className="text-4xl font-bold animate-fadeIn">
              Welcome to GitHub Explorer
            </h1>
            <p className="text-xl opacity-90 animate-fadeIn delay-1000">
              Discover amazing developers and repositories
            </p>
            
            {/* Loading Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
        
        {/* Background floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float delay-2000"></div>
          <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-white bg-opacity-10 rounded-full animate-float delay-1500"></div>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gray-100 px-4 py-6">
      <SearchBar />
      <UserCard />
      <RepoList/>
    </div>
  );
}

export default App;