import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import navitems from '../constants/navbar';
import Banner from './Banner';

function Navbar() {
  const [cartCount, setCartCount] = useState(2);
  const location = useLocation();

  return (
    <header>
      <nav className="border-b-2 border-red-400">
        <div className="bg-tertiary">
          <div className="max-width custom-container flex items-center justify-between px-5 py-3">
            <div>
              <Link to="/"><img src={logo} alt="logo" height={40} width={40} /></Link>
            </div>
            <div className="flex gap-10 items-center ml-10">
              <div className="flex items-center gap-2 bg-white rounded-full shadow-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-4 py-2 focus:outline-none"
                />
                <button className="p-2 bg-primary rounded-full text-tertiary hover:bg-orange-600">
                  <CiSearch size={24} className="hover:scale-110 ease-in-out duration-200" />
                </button>
              </div>
            </div>
            <div className="flex max-width items-center">
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
            <div className="relative flex gap-5">
              <div className="relative">
                <CiShoppingCart
                  size={28}
                  className="hover:text-primary ease-in-out hover:scale-110 duration-500 cursor-pointer"
                />
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-primary rounded-full text-white w-5 h-5 flex items-center justify-center text-sm">
                    {cartCount}
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
