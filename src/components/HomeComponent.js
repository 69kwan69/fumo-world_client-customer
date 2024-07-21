import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import hero from '../assets/spinning-cirno.gif';
import customer from '../assets/testimonials.jpg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => (
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
    ));
    const hotprods = this.state.hotprods.map((item) => (
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
    ));

    return (
      <div className="main grid gap-y-24">
        <div className="grid grid-cols-2 place-items-center">
          <div className="flex flex-col gap-6 items-start">
            <h1 className="title text-6xl leading-tight">
              Have a{' '}
              <span className="font-extrabold decoration-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                spinning cirno.
              </span>
            </h1>
            <p className="text-lg text-slate-500 font-semibold">
              I have no idea why but I feel like I need to put some line of text
              so it doesn't feel empty here. Anyway go get your fumo now!
            </p>
            <Link
              to="/product/category/6693759bd6e2ddc961538b73"
              className="button uppercase text-xl font-bold px-6 py-4 flex items-center gap-4 hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white transition-colors"
            >
              Explore now{' '}
              <span class="material-symbols-rounded">arrow_forward</span>
            </Link>
          </div>
          <img src={hero} alt="spinning cirno" className="p-10 w-full block" />
        </div>

        <div className="mt-10">
          <h2 className="text-center title mb-6">New fumo</h2>
          <div className="grid grid-cols-3 gap-4">{newprods}</div>
        </div>

        <div className="mt-10">
          <h2 className="text-center title mb-6">Hot fumo</h2>
          <div className="grid grid-cols-3 gap-4">{hotprods}</div>
        </div>

        <div className="mt-10 text-slate-500 text-center">
          <p>Copyright &copy; for professionalism.</p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;
