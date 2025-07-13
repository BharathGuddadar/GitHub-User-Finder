# 🔎 GitHub User Finder App

A responsive web application to search GitHub users and view their public repositories. Built with React, Redux Toolkit, TypeScript, and Tailwind CSS. Includes features like infinite scroll, API error handling, and performance optimizations.

## 🚀 Live Demo

🔗 [Github-User-Finder](https://github-user-finder-lovat-five.vercel.app/)

## ✨ Features

- ✅ GitHub user profile search
- ✅ Paginated repositories with infinite scroll
- ✅ API error & loading states
- ✅ Responsive design (mobile-first)
- ✅ TypeScript with strict types
- ✅ Light bundle with Vite
- ✅ Clean folder structure
- ✅ Utility functions for number formatting

## 🛠 Built With

- ⚛️ React + TypeScript
- 🛠 Redux Toolkit
- 🎨 Tailwind CSS
- ⚡ Vite
- 🧪 Vitest + React Testing Library
- 📦 GitHub REST API

## 📦 Project Setup

Follow these steps to run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/bharathps821/github-user-finder.git
cd github-user-finder

# 2. Install dependencies
npm install     # or pnpm install

# 3. Start development server
npm run dev     # or pnpm dev

# 4. Visit
http://localhost:5173
```

## 📁 Project Structure & Architecture

```
src/
│
├── components/           # Reusable UI components (SearchBar, RepoList, Loader, Error)
├── redux/                # Redux Toolkit setup
│   ├── slices/           # State slices for user and repos
│   └── store.ts          # Redux store configuration
│
├── services/             # API functions for GitHub (fetchUserProfile, fetchRepos)
├── App.tsx               # Main App with routing/layout
└── main.tsx              # App entry point
```

## 🔧 State Management

- **userSlice**: Fetches and stores user profile data
- **repoSlice**: Handles paginated repo fetch, infinite scroll, and error/loading states

## 🧠 Key Architectural Decisions

- Redux Toolkit + Async Thunks for clean async logic
- IntersectionObserver for infinite scrolling
- Debounced Search (planned) for rate limit efficiency
- Tailwind CSS for fast responsive UI

## 🧪 Testing

- Redux slice tests using vitest
- Manual testing for all flows (valid, invalid, empty, edge)

## 📈 Planned Improvements

- [ ] Debounced search bar with suggestions
- [ ] Unit & integration tests with mock data
- [ ] OAuth integration for rate-limit bypass
- [ ] Skeleton loaders
- [ ] Custom 404 page
- [ ] Optional dark mode support (auto-detect)

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI

# Linting
npm run lint         # Run ESLint
```

## 📊 Performance Optimizations

- Infinite scroll with IntersectionObserver
- Memoized components and callbacks
- Lazy loading of repository data
- Optimized bundle size with Vite

## 🌐 API Integration

This app uses the GitHub REST API:
- User profile: `GET /users/{username}`
- User repositories: `GET /users/{username}/repos`

Rate limits apply for unauthenticated requests (60 requests/hour).

## 🎨 UI/UX Features

- Clean, modern design with Tailwind CSS
- Responsive layout for all device sizes
- Smooth animations and transitions
- Loading states and error handling
- Language-specific color coding for repositories

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- ES6+ features support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bharath G P**
- GitHub: [BharathGuddadar](https://github.com/bharathguddadar)
- Portfolio: [Portfolio](https://portfolio-6oi9-bharath-g-ps-projects.vercel.app/)

---

Made with 💙 by Bharath G P