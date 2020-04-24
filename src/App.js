import React from "react";
// import logo from './logo.svg';
import "./app.css";

class App extends React.Component {
  state = { page: "", isMenuOpen: false };

  viewPage = (page) => {
    this.setState({ page: page });
    this.setState({ isMenuOpen: false });
  };

  toggleMenu = () => {
    if (this.state.isMenuOpen == false) {
      this.setState({ isMenuOpen: true });
    } else {
      this.setState({ isMenuOpen: false });
    }
  };

  render() {
    return (
      <div>
        <div className={"landing " + (this.state.page == "" ? "openBox" : "")}>
          <img className="landingLogoImg logoAnimation" src="nameLogo.svg" />

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

          <div className="landingSocialMedia fadeIn">
            <a
              href=""
              target="_blank"
              className="socialMediaBtn"
              id="firstSocialMediaBtn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              href="https://github.com/aalbareedi"
              target="_blank"
              className="socialMediaBtn"
            >
              <i className="fab fa-github"></i>
            </a>

            <a
              href="https://www.instagram.com/sir.real/"
              target="_blank"
              className="socialMediaBtn"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <div
              id="hireMeBtn"
              className="socialMediaBtn unselectable"
              onClick={() => {
                this.viewPage("portfolio");
              }}
            >
              View Work
            </div>
          </div>
        </div>
        <div
          className={
            "navLogoBar " +
            (this.state.page != "" || this.state.isMenuOpen == true
              ? "openNavLogoBar"
              : "")
          }
          onClick={() => {
            this.viewPage("");
          }}
        >
          <img className="navLogoImg" src="nameLogo.svg" />
          <div className="navMyName">Amer Albareedi</div>
          <div className="navJobTitle">Front-End Developer</div>
        </div>
        <div className="navToggleBtn fadeIn" onClick={this.toggleMenu}>
          <button
            className={
              "navToggleIcon hamburger hamburger--squeeze " +
              (this.state.isMenuOpen == true ? "is-active" : "")
            }
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <div
          id="aboutBox"
          className={this.state.page == "about" ? "openBox" : ""}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          sapiente libero quaerat consequatur similique facilis, sunt quasi
          porro ullam quod alias recusandae. Labore pariatur consequatur,
          voluptatum possimus perferendis quos culpa!
        </div>
        <div
          id="portfolioBox"
          className={this.state.page == "portfolio" ? "openBox" : ""}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          sapiente libero quaerat consequatur similique facilis, sunt quasi
          porro ullam quod alias recusandae. Labore pariatur consequatur,
          voluptatum possimus perferendis quos culpa!
        </div>
        <div
          id="contactBox"
          className={this.state.page == "contact" ? "openBox" : ""}
        >
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

          <div className="formOption">
            <label
              htmlFor="emailInput"
              className="contactFormText unselectable"
            >
              Email Address<span className="formAsterik">*</span>
            </label>
            <div className="emailField">
              <input
                required
                id="emailInput"
                type="email"
                className="contactFormInput"
                placeholder="email@address.com"
                pattern=".+@.+\..{2,}$"
              />
              <div className="formIcon" id="emailIcon">
                <i className="fas fa-envelope"></i>
              </div>
            </div>
          </div>

          <div className="formMessage">
            <label
              for="messageInput"
              className="contactFormText unselectable"
              id="messageInputLabel"
            >
              Message<span className="formAsterik">*</span>
            </label>
            <textarea
              required
              className="contactFormInput"
              id="messageInput"
              placeholder="Questions, comments, concerns..."
            ></textarea>
          </div>
        </div>
        <div
          className={
            "navMenu " + (this.state.isMenuOpen == true ? "openNavMenu" : "")
          }
        >
          <div
            id="aboutLink"
            className="navMenuOption unselectable"
            onClick={() => {
              this.viewPage("about");
            }}
          >
            About
          </div>
          <div
            id="portfolioLink"
            className="navMenuOption unselectable"
            onClick={() => {
              this.viewPage("portfolio");
            }}
          >
            Portfolio
          </div>
          <div
            id="contactLink"
            className="navMenuOption unselectable"
            onClick={() => {
              this.viewPage("contact");
            }}
          >
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
}

export default App;
