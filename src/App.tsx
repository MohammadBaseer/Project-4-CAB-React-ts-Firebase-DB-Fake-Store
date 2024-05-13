import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import List from "./components/pages/List";
import Details from "./components/pages/Details";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Chat from "./components/pages/chat-Pages/Chat";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <> 
      
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/List" element={<List />} />
              <Route path="/Details" element={<Details />} />
            </Route>

            <Route path="/Chat" element={<Chat />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
