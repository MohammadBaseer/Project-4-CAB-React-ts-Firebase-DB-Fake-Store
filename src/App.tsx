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
import { AuthContextProvider } from "./components/context/AuthContext";
import ProtectedRout from "./components/pages/ProtectedRout";
import { ChatRoomSectionToggleProvider, UsersContextProvider, } from "./components/context/chatContext/ChatRoomSectionsContext";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { ApiContextComponentProvider } from "./components/context/ApiContext";


function App() {





  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={
          <ProtectedRout>
          <Products />
          </ProtectedRout>
          }/>
          <Route path="/products/:id" element={<ProductItemDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </>
    )
  );


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a 2-second fetch
      setLoading(false);
    };
    fetchData();
  }, []);


  return (
    <>
{loading ? <Loader /> : 
      <UsersContextProvider>
        <ChatRoomSectionToggleProvider>
          <AuthContextProvider>

<ApiContextComponentProvider>

              <RouterProvider router={router} />
              
</ApiContextComponentProvider>


          </AuthContextProvider>
        </ChatRoomSectionToggleProvider>
      </UsersContextProvider>
}

    </>
  );
}

export default App;
