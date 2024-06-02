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
import Cart from "./Components/Pages/Cart/Cart";
import Test from "./Components/Pages/Test/Test";
import ProtectedRout from "./Components/AuthActions/ProtectedRouts/ProtectedRouts";
import CardDisplayPage from "./Components/Pages/Admin_Panel/Card_Display_Page/CardDisplayPage";
import MyShop from "./Components/Pages/Admin_Panel/Card_Admin/My_Shop/MyShop";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<CardDisplayPage />} />
          <Route path="/myshop" element={<MyShop />} />
        </Route>
      </>
    )
  );

  return <>{<RouterProvider router={router} />}</>;
}

export default App;
