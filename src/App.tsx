import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Components/Pages/Home/Home";
import Layout from "./Components/Pages/Layout/Layout";
import Products from "./Components/Pages/Product_Components/Products/Products";
import ProductItemDetail from "./Components/Pages/Product_Components/Product_Item_Details/ProductItemDetails";
import Contact from "./Components/Pages/Contact/Contact";
import About from "./Components/Pages/About/About";
import ApiContextProvider from "./Context/Api_Context";
import Login from "./Components/AuthActions/Login/Login";
import Register from "./Components/AuthActions/Register/Register";
import { auth } from "./Components/Config/Firebase_Auth";
import Cart from "./Components/Pages/Cart/Cart";
import { useEffect } from "react";
import Test from "./Components/Pages/Test/Test";

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/test" element={<Test />} />
      </Route>
    )
  );
  // useEffect(() => {
  //   // console.log("Auth from App Page", auth.currentUser);
  // }, []);

  return <>{<RouterProvider router={router} />}</>;
}

export default App;
