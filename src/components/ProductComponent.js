import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Products',
      products: [],
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <Link to={'/product/' + item._id}>
          <div
            key={item._id}
            className="border rounded-md shadow hover:-translate-y-1 hover:shadow-md transition-all"
          >
            <img
              src={'data:image/jpg;base64,' + item.image}
              className="object-contain aspect-square w-full p-4"
              alt=""
            />
            <div className="bg-slate-100 p-4">
              <p className="font-semibold text-lg line-clamp-1">{item.name}</p>
              <div className="flex gap-4 justify-between items-end">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-600">
                  {item.category.name}
                </p>
                <p className="font-bold text-xl">{item.price}$</p>
              </div>
            </div>
          </div>
        </Link>
      );
    });

    return (
      <div className="main">
        <h1 className="title mb-1">{this.state.title}</h1>
        <p className="uppercase text-slate-600 mb-6">
          {this.state.products.length} items
        </p>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {prods}
        </div>
      </div>
    );
  }

  componentDidMount() {
    // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({
        title: `${result[0].category.name} series`,
        products: result,
      });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ title: `Search with '${keyword}'`, products: result });
    });
  }
}

export default withRouter(Product);
