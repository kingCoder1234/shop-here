import React from "react";
import "./HomePage.css";
import { Link } from 'react-router-dom';
import backgroundImage from "../assets/images/image2.png";

const HomePage = () => {
  return (
    <div>
      <div>
        <img src={backgroundImage} alt="Snow" className="background-image" />
        {/* <div className="overlay"></div> */}
        <div className="hero-text centered content">
          <h1>Fashion Sale</h1>
          <h2>Minimal Menz Style</h2>
          <p>
            Consectetur adipisicing elit. Laborum fuga incidunt laboriosam
            voluptas iure, delectus dignissimos facilis neque nulla earum.
          </p>
          <button><Link to={"/products"} className="link">Shop Now</Link></button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
