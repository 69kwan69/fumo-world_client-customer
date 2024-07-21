import axios from 'axios';
import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
    };
  }

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;
    return (
      <div className="main">
        <h1 className="title">My profile</h1>

        <form className="form grid grid-cols-[10ch_1fr] items-center gap-y-2 max-w-lg mx-auto">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            className="border-none !py-1"
            type="text"
            value={this.state.txtUsername}
            onChange={(e) => {
              this.setState({ txtUsername: e.target.value });
            }}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="border-none !py-1"
            type="password"
            value={this.state.txtPassword}
            onChange={(e) => {
              this.setState({ txtPassword: e.target.value });
            }}
          />

          <label htmlFor="name">Name:</label>
          <input
            id="name"
            className="border-none !py-1"
            type="text"
            value={this.state.txtName}
            onChange={(e) => {
              this.setState({ txtName: e.target.value });
            }}
          />

          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            className="border-none !py-1"
            type="tel"
            value={this.state.txtPhone}
            onChange={(e) => {
              this.setState({ txtPhone: e.target.value });
            }}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="border-none !py-1"
            type="email"
            value={this.state.txtEmail}
            onChange={(e) => {
              this.setState({ txtEmail: e.target.value });
            }}
          />

          <div className="buttons col-span-2">
            <button className="button" onClick={(e) => this.btnUpdateClick(e)}>
              Edit
            </button>
            <Link
              className="button text-center"
              to="/home"
              onClick={() => this.lnkLogoutClick()}
            >
              Logout
            </Link>
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
      });
    }
  }

  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert('Please check your username, password, name, phone or email');
    }
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/customer/customers/' + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Profile updated!');
        this.context.setCustomer(result);
      } else {
        alert("There's something wrong, please try again!");
      }
    });
  }
}

export default Myprofile;
