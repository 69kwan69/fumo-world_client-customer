import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Account from './AccountComponent';

class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/category/:cid" element={<Product />} />
          <Route path="/product/search/:keyword" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/active" element={<Active />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    );
  }
}
export default Main;
