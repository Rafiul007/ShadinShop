import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import navitems from '../constants/navbar';
import Banner from './Banner';
import Cart from '../components/Cart';

function Navbar() {
  const [cartCount, setCartCount] = useState(2);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Sample cart items
  const [cartItems, setCartItems] = useState([
    { name: 'Adidas Samba (White)', price: 29.99 },
    { name: 'Air Jordern High OG Red', price: 19.99 },
    { name: 'New Balance 550', price: 39.99 },
    { name: 'Levis 501', price: 24.99 },
  ]);

  return (
    <header>
      <nav className="border-b-2 border-red-400">
        <div className="bg-tertiary">
          <div className="max-width custom-container flex items-center justify-between px-5 py-3">
            <div>
              <Link to="/"><img src={logo} alt="logo" height={40} width={40} /></Link>
            </div>
            {/* search */}
            <div className="flex gap-10 items-center ml-10">
              <div className="flex items-center gap-2 bg-white rounded shadow-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-4 py-2 focus:outline-none"
                />
                <button className="px-4 py-2 bg-primary text-tertiary hover:bg-orange-600">
                  <CiSearch size={24} className="hover:scale-110 ease-in-out duration-200" />
                </button>
              </div>
            </div>
            {/* search end */}
            {/* menu */}
            <div className="flex px-2 items-center">
              <ul className="flex gap-10 justify-center items-center">
                {navitems.map((item) => (
                  <li
                    key={item.id}
                    className={`hover:text-primary ease-in-out duration-500 ${
                      location.pathname === item.link ? 'text-primary ' : ''
                    }`}
                  >
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* menu end */}
            <div className="relative flex gap-5">
              <div className="relative">
                <CiShoppingCart
                  size={28}
                  className="hover:text-primary ease-in-out hover:scale-110 duration-500 cursor-pointer"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                />
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-primary rounded-full text-white w-5 h-5 flex items-center justify-center text-sm">
                    {cartCount}
                  </div>
                )}
                {isCartOpen && (
                  <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-80 z-50">
                    <Cart cartItems={cartItems} />
                  </div>
                )}
              </div>
              <CiUser
                size={28}
                className="hover:text-primary ease-in-out hover:scale-110 duration-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </nav>
      <Banner />
    </header>
  );
}

export default Navbar;
