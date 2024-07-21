import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: '',
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id}>
          <Link to={'/product/category/' + item._id}>{item.name}</Link>
        </li>
      );
    });

    return (
      <div className="nav gap-2">
        <ul>
          <li>
            <Link
              className="hover:!no-underline text-xl font-bold tracking-wide"
              to="/"
            >
              ᗜˬᗜ Fumo<span className="text-slate-500">World</span>
            </Link>
          </li>
          {cates}
        </ul>

        <div className="flex items-center gap-2">
          <form className="border rounded-full flex justify-between items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200">
            <span class="material-symbols-rounded">search</span>
            <input
              className="w-full bg-inherit outline-none"
              type="search"
              placeholder="Search product"
              value={this.state.txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
            />
            <button
              className="button rounded-full hidden"
              onClick={(e) => this.btnSearchClick(e)}
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-2">
            {this.context.token === '' ? (
              <>
                <Link className="button rounded-full" to="/signup">
                  Signup
                </Link>
                <Link
                  className="button rounded-full border-none bg-inherit"
                  to="/login"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="button rounded-full py-2 px-4 grid place-items-center grid-flow-col gap-2"
                  to="/account/cart"
                  title={`My cart has ${this.context.mycart.length} items`}
                >
                  <span className="material-symbols-rounded">
                    shopping_cart
                  </span>
                  <span>{this.context.mycart.length}</span>
                </Link>
                <Link
                  className="button rounded-full p-2 grid place-items-center"
                  to="/account/profile"
                >
                  <span class="material-symbols-rounded">person</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // event-handlers
  componentDidMount() {
    this.apiGetCategories();
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }

  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);
