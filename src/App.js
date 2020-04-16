import React from "react";
// import logo from './logo.svg';
import "./app.css";

function App() {
  return (
    <div>
      <div className="landing openBox">
        <img className="landingLogoImg" src="nameLogo.svg" />

        <div className="introBox typeWriter">
          <div>
            Hi! My name is <span className="myNameValue">Amer Albareedi</span>
          </div>
          <div>
            and I am a{" "}
            <span className="jobTitleValue"> Front-End Developer</span>.
          </div>
          <div>I help businesses establish an</div>
          <div>impactful online presence by</div>
          <div>designing high-quality websites</div>

          <div className="wordSpace">tailored to best serve their users.</div>
        </div>

        <div className="landingSocialMedia">
          <a
            href="https://github.com/aalbareedi"
            target="_blank"
            className="socialMediaBtn"
            id="firstSocialMediaBtn"
          >
            <i className="fab fa-github"></i>
          </a>
          <a href="" target="_blank" className="socialMediaBtn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://www.instagram.com/sir.real/"
            target="_blank"
            className="socialMediaBtn"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <div id="hireMeBtn" className="socialMediaBtn unselectable">
            View Work
          </div>
        </div>
      </div>
      <div className="navLogoBar">
        <img className="navLogoImg" src="nameLogo.svg" />
        <div className="navMyName">Amer Albareedi</div>
        <div className="navJobTitle">Front-End Developer</div>
      </div>
      <div className="navToggleBtn">
        <button
          className="navToggleIcon hamburger hamburger--squeeze"
          type="button"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      <div id="aboutBox">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente
        libero quaerat consequatur similique facilis, sunt quasi porro ullam
        quod alias recusandae. Labore pariatur consequatur, voluptatum possimus
        perferendis quos culpa!
      </div>
      <div id="portfolioBox">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque sapiente
        libero quaerat consequatur similique facilis, sunt quasi porro ullam
        quod alias recusandae. Labore pariatur consequatur, voluptatum possimus
        perferendis quos culpa!
      </div>
      <div id="contactBox">
        <div className="formTitle">Let's Get In Touch</div>
        <div className="formOption">
          <label htmlFor="nameInput" className="contactFormText unselectable">
            Full Name<span className="formAsterik">*</span>
          </label>
          <div className="fullNameField">
            <input
              required
              id="nameInput"
              type="text"
              className="contactFormInput"
              placeholder="Firstname Lastname"
            />
            <div className="formIcon" id="fullNameIcon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="navMenu">
        <div id="aboutLink" className="navMenuOption unselectable">
          About
        </div>
        <div id="portfolioLink" className="navMenuOption unselectable">
          Portfolio
        </div>
        <div id="contactLink" className="navMenuOption unselectable">
          Contact
        </div>
      </div>
      {/* <button className="opacityZero backToTopBtn" href="#landing"></button>  */}
      <script src="js/domObjects.js"></script>
      <script src="js/functions.js"></script>
      <script src="js/script.js"></script>
      <script src="js/eventHandlers.js"></script>
    </div>
  );
}

export default App;
