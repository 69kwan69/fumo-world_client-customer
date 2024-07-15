import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td>{index + 1}</td>
          <td>{item.product._id}</td>
          <td>{item.product.name}</td>
          <td>{item.product.category.name}</td>
          <td>
            <img
              src={'data:image/jpg;base64,' + item.product.image}
              width="70px"
              height="70px"
              alt=""
            />
          </td>
          <td>{item.product.price}</td>
          <td>{item.quantity}</td>
          <td>{item.product.price * item.quantity}</td>
          <td>
            <span
              className="link"
              onClick={() => this.lnkRemoveClick(item.product._id)}
            >
              Remove
            </span>
          </td>
        </tr>
      );
    });

    return (
      <div className="main">
        <h1 className="title mb-6">My cart</h1>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{mycart}</tbody>
          </table>
        </div>

        <div className="w-max ml-auto mt-6 flex gap-6">
          <div className="text-right">
            <p>Total</p>
            <p className="text-2xl font-bold">
              {CartUtil.getTotal(this.context.mycart)}$
            </p>
          </div>
          <button
            className="button shadow flex items-center gap-2 uppercase font-bold tracking-wider"
            onClick={() => this.lnkCheckoutClick()}
          >
            Checkout<span class="material-symbols-rounded">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex((x) => x.product._id === id);
    if (index !== -1) {
      // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }

  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }

  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default withRouter(Mycart);
