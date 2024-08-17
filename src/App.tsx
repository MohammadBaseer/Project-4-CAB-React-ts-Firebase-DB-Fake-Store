import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Pages/Layout/Layout";
import ApiContextProvider from "./Context/Api_Context";
import Home from "./components/Pages/Home/Home";
import Products from "./components/Pages/Product_Components/Products/Products";
import ProductItemDetail from "./components/Pages/Product_Components/Product_Item_Details/ProductItemDetails";
import Contact from "./components/Pages/Contact/Contact";
import About from "./components/Pages/About/About";
import Register from "./components/AuthActions/Register/Register";
import Login from "./components/AuthActions/Login/Login";
import ProtectedRoute from "./components/AuthActions/ProtectedRouts/ProtectedRouts";
import Cart from "./components/Pages/Cart/Cart";
import MyShop from "./components/Pages/Admin_Panel/Card_Admin/My_Shop/MyShop";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/products"
          element={
            <ApiContextProvider>
              <Products />
            </ApiContextProvider>
          }
        />
        <Route path="/products/:id" element={<ProductItemDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myShop"
          element={
            <ProtectedRoute>
              <MyShop />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
