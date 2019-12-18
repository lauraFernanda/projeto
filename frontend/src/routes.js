import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login/index";
import Home from "./pages/Home/index";
import Users from './pages/Users/User';
import NewUser from './pages/Users/NewUser';
import EditUser from './pages/Users/EditUser';
import SearchUser from './pages/Users/SearchUser';
import UserReport from './pages/Users/ReportUser';
import Product from './pages/Products/Product';
// import EditProduct from './pages/Users/EditProduct';
import SearchProduct from './pages/Products/SearchProduct';
import ProductReport from './pages/Products/ReportProduct';
// import EditProduct from './pages/Products/EditProduct';
import Provider from './pages/Provider/Provider';
import SearchProvider from './pages/Provider/SearchProvider';
import ProviderReport from './pages/Provider/ReportProvider';
// import EditProvider from './pages/Provider/EditProvider';


export default function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/users" component={Users} />
      <Route path='/newUser' component={NewUser} />
      <Route path='/userEdit' component={EditUser} />
      <Route path='/searchUser' component={SearchUser} />
      <Route path ='/userReport' component={UserReport} />
      <Route path ='/product' component={Product} />
      {/* <Route path='/productEdit' component={EditProduct} /> */}
      <Route path='/searchProduct' component={SearchProduct} />
      <Route path ='/productReport' component={ProductReport} />
      <Route path ='/provider' component={Provider} />
      {/* <Route path='/productEdit' component={EditProduct} /> */}
      <Route path='/searchProvider' component={SearchProvider} />
      <Route path ='/providerReport' component={ProviderReport} />
    </BrowserRouter>
  );
}
