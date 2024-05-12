import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import List from "./components/pages/List";
import Details from "./components/pages/Details";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Chat from "./components/pages/chat-Pages/Chat";

function App() {
  return (
    <>
      <div className="main-layout">
        <Router>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/List" element={<List />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Details" element={<Details />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
