import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";

const Header = () => {
  const { user, handleLoggedInUser, handleLogout } = useAuthContext();
  const { cart } = useCartContext();

  const handleUserLogout = async () => {
    await handleLogout();
  };

  useEffect(() => {
    handleLoggedInUser();
  }, [handleLoggedInUser]);

  const isAdmin = user && user.role === "admin";
  const cartItemCount = cart ? cart.items?.length : 0;

  return (
    <header className="header">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Shop_Here
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin Panel
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {user && user.name ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    <i className="fa fa-user" aria-hidden="true"></i> {user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link position-relative">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    {cartItemCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleUserLogout}>
                    <i className="fa fa-sign-out mx-3" aria-hidden="true"></i>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <i className="fa fa-sign-in" aria-hidden="true"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    <i className="fa fa-user-plus" aria-hidden="true"></i> Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
