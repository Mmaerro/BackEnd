import React from "react";
import "./navBar.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="p-3 text-bg-dark fixed-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img
              className="me-5"
              width="40"
              height="35"
              src="https://res.cloudinary.com/dcm170r29/image/upload/v1688476489/logWebb_hfrk0d.png"
              alt="img"
            />
          </Link>
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          ></Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to="/" className="nav-link px-2 text-secondary">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                FAQs
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="nav-link px-2 text-white">
                About
              </NavLink>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              Login
            </button>
            <button type="button" className="btn btn-warning">
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
