import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-auto ">
      <div className="container">
        <div className="row">
          <div className="col text-center py-3">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              <i className="fa fa-facebook-f"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              <i className="fa fa-youtube"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              <i className="fa fa-instagram"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-floating mx-2"
              style={{ backgroundColor: "#54456b" }}
            >
              <i className="fa fa-twitter"></i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col text-center py-3">
            <p className="text-muted mb-0">
              © {new Date().getFullYear()} Copyright:
              <a className="text-muted" href="https://mdbootstrap.com/">
                MDBootstrap.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
