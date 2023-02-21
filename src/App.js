import { Route, Routes, useNavigate } from "react-router-dom";
import AddEdit from "./pages/AddEdit/AddEdit";
import Home from "./pages/Home/Home";
import View from "./pages/VIew/View";
import About from "./pages/About/About";
import Header from "./components/Header";
import Posts from "./pages/Posts/Posts";
import SignIn from "./pages/Login/Login";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/home");
  };

  const handleLogout = () => {
    alert("Are you sure you want to logout?");
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      {isLoggedIn && <Header onLogout={handleLogout} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<AddEdit />} />
            <Route path="/update/:id" element={<AddEdit />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/posts/:id" element={<Posts />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="*" element={<h1>No page found </h1>} /> */}
          </>
        ) : (
          <Route path="/" element={<SignIn onLogin={handleLogin} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
