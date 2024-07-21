import axios from 'axios';
import React, { Component } from 'react';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: '',
    };
  }
  render() {
    return (
      <div>
        <h1 className="title mb-6">Activate account</h1>

        <form class="form border rounded-md">
          <label>
            ID
            <input
              type="text"
              value={this.state.txtID}
              onChange={(e) => {
                this.setState({ txtID: e.target.value });
              }}
            />
          </label>

          <label>
            Token
            <input
              type="text"
              value={this.state.txtToken}
              onChange={(e) => {
                this.setState({ txtToken: e.target.value });
              }}
            />
          </label>

          <button
            className="button shadow"
            onClick={(e) => this.btnActiveClick(e)}
          >
            Activate
          </button>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please enter id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Account ativated!');
      } else {
        alert("There's somthing wrong, please try again!");
      }
    });
  }
}
export default Active;
