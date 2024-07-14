import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Active from './ActiveComponent';

class Signup extends Component {
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
    return (
      <div className="grid grid-cols-2 justify-items-center min-h-dvh p-10">
        <div>
          <div className="flex justify-between items-end gap-6 mb-6">
            <h1 className="title">Signup</h1>
            <Link className="text-slate-600 underline" to={'/login'}>
              Login
            </Link>
          </div>

          <form className="form border rounded-md">
            <label>
              Username
              <input
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => {
                  this.setState({ txtUsername: e.target.value });
                }}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => {
                  this.setState({ txtPassword: e.target.value });
                }}
              />
            </label>

            <label>
              Name
              <input
                type="text"
                value={this.state.txtName}
                onChange={(e) => {
                  this.setState({ txtName: e.target.value });
                }}
              />
            </label>

            <label>
              Phone
              <input
                type="tel"
                value={this.state.txtPhone}
                onChange={(e) => {
                  this.setState({ txtPhone: e.target.value });
                }}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={this.state.txtEmail}
                onChange={(e) => {
                  this.setState({ txtEmail: e.target.value });
                }}
              />
            </label>

            <button
              className="button shadow"
              onClick={(e) => this.btnSignupClick(e)}
            >
              Create account
            </button>
          </form>
        </div>

        <Active />
      </div>
    );
  }

  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      this.apiSignup(account);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }

  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Signup;
