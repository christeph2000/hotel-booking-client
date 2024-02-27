import { useState } from "react"
import React from "react"
import { Nav } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false)

  const handleAccountClick = () => {
    setShowAccount(!showAccount)
  }
  return (
    <Nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color ">LakeSide Hotel</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="#navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarScroll"
        >
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scoll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/browse-all-rooms"}
              >
                Browse all Rooms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                Admin
              </NavLink>
            </li>
          </ul>
          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-booking"}>
                Find my booking
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link to={"/login"} className="drop-drown-item">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"} className="drop-drown-item">
                    profile
                  </Link>
                </li>
                <li>
                  <Link to={"/logout"} className="drop-drown-item">
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  )
}

export default NavBar
