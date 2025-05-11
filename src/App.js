import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from './pages/Signup';
import { SignIn } from "./pages/Signin";
import { Dashboard } from "./pages/Home";
import { TrendingPage } from "./pages/Trending";
import { Play } from "./pages/PlayVideo";
import { Search } from "./pages/SearchPage";
import { Subscriptions } from "./pages/Subscriptions";
import { Profile } from "./pages/Profile";

import './Styles/App.css';
import './Styles/index.css';



function App() {
  return (
    <Router >
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/watch/:videoId" element={<Play />} />
          <Route path="/search" element={<Search />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
