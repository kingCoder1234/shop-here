import React from "react";
import "./About.css";
import About_Image from "../assets/images/About.JPG";
import officeImage from "../assets/images/AboutTeam.png";

const About = () => {
  return (
    <div className="about-container container text-dark">
      <section className="about-section">
        <div className="about-image">
          <img src={About_Image} alt="Founder" />
        </div>
        <div className="about-content">
          <h2>Our Founding</h2>
          <p>
            Moz was founded by Rand Fishkin and Gillian Muessig in 2004. It was
            called SEOmoz, and started as a blog and an online community where
            some of the world's first SEO experts shared their research and
            ideas. We launched the Beginner's Guide to SEO and our first Search
            Ranking Factors study, and that hub of industry expertise
            transformed into a small consulting firm and led us to create some
            of our first SEO tools.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2>Early Growth & Funding</h2>
          <p>
            After a glimpse of the demand, we shifted our focus from consulting
            to our software, taking our first round of funding in 2007 to power
            the development of new tools and ideas. By 2009, we tallied our
            first 5,000 subscribers and codified our core values in the acronym
            TAGFEE, continuing to lead the industry with our educational content
            in an effort to demystify SEO (this is also when we started filming!).
          </p>
        </div>
        <div className="about-image">
          <img src={officeImage} alt="Office" />
        </div>
      </section>
    </div>
  );
};

export default About;
