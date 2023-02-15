import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEdit from "./pages/AddEdit/AddEdit";
import Home from "./pages/Home/Home";
import View from "./pages/VIew/View";
import About from "./pages/About/About";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
