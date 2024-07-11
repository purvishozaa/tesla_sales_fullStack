// // Header.js

import React from "react";
import "./Header.scss";
import { Link } from 'react-router-dom';
import Tesla from "../../assets/images/Tesla.png";

const Header = () => {


  return (
    <nav class="navbar">
      <div class="container">
      <div className="header__title">
         <img src={Tesla} alt="Tesla_Image" className="header-image"/>
         <h1>Tesla Industrial Battery Layout</h1>
       </div>

        <div class="main-menu">
        <nav>
          <ul>
            <li>
            <Link to="/about">  <button >About</button></Link>
            </li>
            <li>
            <Link to="/battery-configuration"> <button >
               Configuration
             </button></Link>
            </li>
            
            <li>
            <Link to="/logout"> <button >
               LogOut
             </button></Link>
            </li>
          </ul>
          </nav>
        </div>
        </div>
        </nav>

  );
};

export default Header;
