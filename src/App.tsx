import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Details from "./components/pages/Details";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Chat from "./components/pages/chat-Pages/Chat";
import Layout from "./components/layouts/Layout";
import Products from "./components/pages/Products";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/details" element={<Details />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
