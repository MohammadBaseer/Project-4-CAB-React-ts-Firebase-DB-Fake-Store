import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Chat from "./components/pages/chat-Pages/Chat";
import Layout from "./components/layouts/Layout";
import Products from "./components/pages/Products";
import ProductItemDetail from "./components/pages/ProductItemDetails";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import { ProductsContextComponent } from "./components/context/ProductsContext";
import { AuthContextProvider } from "./components/context/AuthContext";
import ProtectedRout from "./components/pages/ProtectedRout";
import LocalLogin from "./components/pages/LocalLogin";
//

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="/products"
            element={
              <ProtectedRout>
                <Products />
              </ProtectedRout>
            }
          />

          <Route path="/products/:id" element={<ProductItemDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/local-Login" element={<LocalLogin />}></Route>
      </>
    )
  );

  return (
    <>
      <AuthContextProvider>
        <ProductsContextComponent>
          <RouterProvider router={router} />
        </ProductsContextComponent>
      </AuthContextProvider>
    </>
  );
}

export default App;
