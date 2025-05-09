import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from './Pages/Signup';
import { SignIn } from "./Pages/Signin";
import { Dashboard } from "./Pages/Home";
import { TrendingPage } from "./Pages/Trending";
import { Play } from "./Pages/PlayVideo";
import { Search} from "./Pages/SearchPage";
import {Subscriptions} from "./Pages/Subscriptions"
import { Profile } from "./Pages/Profile";

import './Styles/App.css';
import './Styles/index.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/trending" element={<TrendingPage/>}/>
          <Route path="/watch/:videoId" element={<Play />} /> 
          <Route path="/search" element={<Search />} />
          <Route path="/subscriptions" element={<Subscriptions/>}/>
          <Route  path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
