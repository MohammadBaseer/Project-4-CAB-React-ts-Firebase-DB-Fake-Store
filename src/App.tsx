import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Chat from "./components/pages/chat-Pages/Chat";
import Layout from "./components/layouts/Layout";
import Products from "./components/pages/Products";
import ProductItemDetail from "./components/pages/ProductItemDetails";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductItemDetail />} />
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
