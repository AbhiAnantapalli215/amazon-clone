import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Products from "./pages/products";
import {Routes,BrowserRouter,Route} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import CartPage from "./pages/CartPage";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";
import Accounts from "./pages/Accounts";
import ItemDetails from "./pages/ItemDetails";
import UserContext from "./pages/UserContext";
import {useState , useEffect} from 'react';
import axios from "axios";

function App() {
  const [prooducts,changeProducts]=useState(null)
  const FetchData=async()=>{
    const data=new FormData()
    const Response=await axios.post("https://amazon.indianhackerslab.com/get-products.php",data,{headers:{"content-type":"multipart/form-data"}})
    if(Response){
      changeProducts(Response.data.products)
    }
  }
  useEffect(()=>{
    FetchData()
  },[])
  return (
    <div className="App">
        <UserContext.Provider value={prooducts}>
            <BrowserRouter>
              <Header></Header>
              <Routes>

              <Route path="/" element={<Homepage></Homepage>}></Route>
              <Route path="/electronics" element={<Products></Products>}></Route>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route path="/accounts" element={<Accounts></Accounts>}></Route>
              <Route path="/item-details/:product_id" element={<ItemDetails></ItemDetails>}></Route>
              </Routes>
              <Footer></Footer>
            </BrowserRouter>
        </UserContext.Provider>
    </div>
  );
}

export default App;
