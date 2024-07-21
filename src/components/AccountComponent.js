import { NavLink, Outlet } from 'react-router-dom';

export default function Account() {
  return (
    <>
      <Outlet />

      <div className="bottom-10 left-1/2 fixed flex *:flex-1 gap-2 bg-white shadow-lg p-2 border rounded-lg max-w-5xl -translate-x-1/2">
        <NavLink to={'/account/profile'} className="uppercase button">
          Profile
        </NavLink>
        <NavLink to={'/account/cart'} className="uppercase button">
          Cart
        </NavLink>
        <NavLink to={'/account/order'} className="uppercase button">
          Order
        </NavLink>
      </div>
    </>
  );
}
