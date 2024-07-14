import { useState } from 'react';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';

export default function Account() {
  const [tab, setTab] = useState('profile');

  return (
    <>
      {tab === 'order' ? (
        <Myorders />
      ) : tab === 'cart' ? (
        <Mycart />
      ) : (
        <Myprofile />
      )}

      <div className="bottom-10 left-1/2 fixed flex *:flex-1 gap-2 bg-white shadow-lg p-2 border rounded-lg max-w-5xl -translate-x-1/2">
        <button onClick={() => setTab('profile')} className="uppercase button">
          Profile
        </button>
        <button onClick={() => setTab('cart')} className="uppercase button">
          Cart
        </button>
        <button onClick={() => setTab('order')} className="uppercase button">
          Order
        </button>
      </div>
    </>
  );
}
