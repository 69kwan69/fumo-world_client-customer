import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1,
    };
  }

  render() {
    const prod = this.state.product;
    if (prod != null)
      return (
        <div className="main">
          <h1 className="title mb-6">Product details</h1>

          <div className="grid sm:grid-cols-2 gap-y-6 gap-x-10">
            <img
              src={'data:image/jpg;base64,' + prod.image}
              className="object-contain aspect-square w-full p-4 border rounded-md shadow"
              alt=""
            />

            <div className="flex flex-col gap-6">
              <div>
                <span className="uppercase tracking-[0.25em] text-slate-600">
                  {prod.category.name}
                </span>
                <h2 className="font-semibold text-2xl">{prod.name}</h2>
              </div>

              <p className="text-slate-600 text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Temporibus, facilis. Quibusdam reprehenderit fugiat, nisi dolore
                a laudantium mollitia expedita animi! Consequatur rem, enim
                dolor saepe minima quis assumenda nobis optio aspernatur
                perspiciatis molestias, natus nam illo nihil corrupti tempore.
                Totam, consectetur ea. Cum, sunt et? Quisquam modi cum rem
                soluta?
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-1">
                <label className="flex gap-4 items-end">
                  <span className="text-slate-600">Quantity:</span>
                  <input
                    className="text-2xl font-bold w-[4ch]"
                    type="number"
                    min="1"
                    max="99"
                    value={this.state.txtQuantity}
                    onChange={(e) => {
                      this.setState({ txtQuantity: e.target.value });
                    }}
                  />
                </label>

                <p className="flex gap-4 items-end">
                  <span className="text-slate-600">Total:</span>
                  <span className="text-2xl font-bold">
                    {parseInt(prod.price) * parseInt(this.state.txtQuantity)}$
                  </span>
                </p>
              </div>

              <button
                className="button uppercase font-semibold"
                onClick={(e) => this.btnAdd2CartClick(e)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    return <div />;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex((x) => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) {
        // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Added successfully!');
    } else {
      alert('Please enter the quantity');
    }
  }

  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}

export default withRouter(ProductDetail);
