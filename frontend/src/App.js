import Header from './compnent/layout/Header/Header';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import WebFont from 'webfontloader';
import {useEffect} from 'react';
import Footer from "./compnent/layout/Footer/Footer.js"
import Home from "./compnent/Home/Home"
import ProductDetails from './compnent/Product/ProductDetails';
import Products from './compnent/Product/Products';
import Search from "./compnent/Product/Search.js"
import LoginSignUp from './compnent/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from "./compnent/layout/Header/UserOptions.js";


function App () {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect (() => {
    WebFont.load (
      {
        google: {
          families: ['Roboto', 'Droid Sans', 'Chilanka'],
        },
      },
      
    );

    store.dispatch(loadUser());
  },[]);
  return (
    <Router>
      <Header />
       
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
      <Route extract path='/' element={<Home />} />    
      <Route  path='/product/:id' element={<ProductDetails />} />   
      <Route extract path='/products' element={<Products />} />
      <Route  path='/products/:keyword' element={<Products />} />
      <Route  path='/search' element={<Search />} />
      <Route  path='/login' element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
