// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import NotFound from "./components/NotFound/NotFound";
import SplashScreen from "./components/SplashScreen/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); 
    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
