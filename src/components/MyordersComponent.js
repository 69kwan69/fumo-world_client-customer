import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;
    const orders = this.state.orders.map((item, index) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{index + 1}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>${item.total}</td>
          <td>
            <span
              className={
                item.status === 'CANCELED'
                  ? 'text-red-700'
                  : item.status === 'APPROVED'
                  ? 'text-green-700'
                  : ''
              }
            >
              {item.status}
            </span>
          </td>
        </tr>
      );
    });

    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id}>
            <td>{index + 1}</td>
            <td>
              <img
                src={'data:image/jpg;base64,' + item.product.image}
                width="70px"
                height="70px"
                alt=""
              />
            </td>
            <td>{item.product.name}</td>
            <td>{item.product.category.name}</td>
            <td>{item.quantity}</td>
            <td>${item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }

    return (
      <div className="main">
        <div>
          <h1 className="title mb-6">My orders</h1>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Created on</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </table>
          </div>
        </div>

        {this.state.order && (
          <div className="mt-10">
            <h2 className="text-xl uppercase mb-6">Details</h2>

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Total price</th>
                  </tr>
                </thead>
                <tbody>{items}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Myorders;
