import React from "react";
import "./normalize.css";
import "./hamburgers.css";
import "./style.css";
import "./mobile.css";

import SocialMediaLink from "./components/socialMediaLink";
// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function () {}, true);

class App extends React.Component {
  state = {
    page: "landing",
    isMenuOpen: false,
    isHtmlMenuOpen: false,
    isCssMenuOpen: false,
    isJsMenuOpen: false,
    openOrthoProject: true,
  };

  viewPage = (page) => {
    this.setState({ page: page });
    this.setState({ isMenuOpen: false });
  };

  toggleMenu = (event) => {
    event.stopPropagation();

    if (this.state.isMenuOpen == false) {
      this.setState({ isMenuOpen: true });
    } else {
      this.setState({ isMenuOpen: false });
    }
  };

  render() {
    return (
      <div id="wrapper">
        <div
          className={
            "landing " +
            (this.state.page == "landing" && this.state.isMenuOpen == false
              ? "openBox"
              : "")
          }
        >
          <img className="landingLogoImg logoAnimation" src="nameLogo.svg" />

          <div className="introBox typeWriter">
            <div>
              Hello! My name is
              <span className="myNameValue"> Amer Albareedi</span>
            </div>
            <div>
              and I am a
              <span className="jobTitleValue"> Front-End Web Developer</span>.
            </div>
            <div>I help businesses establish an</div>
            <div>impactful online presence by</div>
            <div>designing high-quality websites</div>

            <div>optimized to best serve their users.</div>
          </div>

          {/* <div className="landingSocialMedia fadeIn"> */}
          {/* <SocialMediaLink url="" icon="fa-linkedin-in" />
            <SocialMediaLink
              url="https://github.com/aalbareedi"
              icon="fa-github"
            />
            <SocialMediaLink
              url="https://www.instagram.com/sir.real/"
              icon="fa-instagram"
            /> */}

          <div
            className="hireMeBtn fadeIn unselectable"
            onClick={() => {
              this.viewPage("portfolio");
            }}
          >
            About Me
            <div className={"homeNavBtn fadeIn"} onClick={this.toggleMenu}>
              <button
                className={"navToggleIcon hamburger hamburger--squeeze"}
                type="button"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            {/* <div className="eyeIcon">
              <img className="eyeImg" src="eye.svg" />
            </div> */}
          </div>
          {/* </div> */}
        </div>

        <div
          className={
            "navLogoBar " +
            (this.state.page != "landing" || this.state.isMenuOpen == true
              ? "openNavLogoBar"
              : "") +
            " " +
            (this.state.page != "landing" && this.state.isMenuOpen == false
              ? "fadeBgColor"
              : "")
          }
          onClick={() => {
            this.viewPage("landing");
          }}
        >
          <img className="navLogoImg" src="nameLogo.svg" />
          <div className="navMyName">Amer Albareedi</div>
          <div className="navJobTitle">Front-End Web Developer</div>
        </div>

        <div
          id="aboutBox"
          className={
            this.state.page == "about" && this.state.isMenuOpen == false
              ? "openBox"
              : ""
          }
        >
          <img className="ImgEffectL" src="bg4.svg" />
          <img className="ImgEffectR" src="bg4.svg" />
          <img className="faceImg" src="newProfile.svg" />

          <div className="aboutIntroText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
            expedita. Nihil rerum corrupti quisquam quos explicabo est velit non
            maxime distinctio? At exercitationem vero praesentium veritatis
            dolore, excepturi tempore quae.
          </div>

          <div className="responsiveWeb">
            <img className="responWebImg webMobileImg" src="mobile.svg" />
            <img className="responWebImg webTabletImg" src="tablet.svg" />
            <img className="responWebImg webLaptopImg" src="laptop.svg" />
            <img className="responWebImg webDesktopImg" src="desktop.svg" />
            <img className="responWebImg stroke strokeImg1" src="stroke1.svg" />
            <img className="responWebImg stroke strokeImg2" src="stroke1.svg" />
            <img className="responWebImg stroke strokeImg3" src="stroke1.svg" />
          </div>

          <div className="aboutIntroText">
            Lorem ipsum, dolor sit amet adipisicing elit fugit natus modi
            voluptas, consectetur odio nisi enim vero cumque quos.
          </div>

          <div
            className={
              "aboutWebSkill " +
              (this.state.isHtmlMenuOpen == true ? "openIconBox" : "")
            }
          >
            <img className="newHtmlIcon" src="html.svg" />
            <div className="newIconTitle">HTML</div>
            <div
              className="newIconOpenBtn"
              onClick={() => {
                this.setState({ isHtmlMenuOpen: !this.state.isHtmlMenuOpen });
              }}
            >
              <i className="fas fa-angle-down arrowDown"></i>
            </div>

            <div className="iconDropdown">
              <div className="aboutIconTextWrapper">
                <div className="aboutIconBullet">•</div>
                <div className="aboutIconText">
                  Properly formatted structuring.
                </div>
              </div>
              <div className="aboutIconTextWrapper">
                <div className="aboutIconBullet">•</div>
                <div className="aboutIconText">
                  Accessibility and SEO friendly syntax always prioritized.
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              "aboutWebSkill " +
              (this.state.isCssMenuOpen == true ? "openIconBox" : "")
            }
          >
            <img className="newHtmlIcon" src="css.svg" />
            <div className="newIconTitle">CSS</div>
            <div
              className="newIconOpenBtn"
              onClick={() => {
                this.setState({ isCssMenuOpen: !this.state.isCssMenuOpen });
              }}
            >
              <i className="fas fa-angle-down arrowDown"></i>
            </div>
            <div className="iconDropdown">
              <div className="aboutIconTextWrapper">
                <div className="aboutIconBullet">•</div>
                <div className="aboutIconText">
                  Proficient understanding of The Box Model, along with Flexbox,
                  Grid, & position.
                </div>
              </div>
              <div className="aboutIconTextWrapper">
                <div className="aboutIconBullet">•</div>
                <div className="aboutIconText">
                  Proficient understanding of The Box Model, along with Flexbox,
                  Grid, & position.
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              "aboutWebSkill " +
              (this.state.isJsMenuOpen == true ? "openIconBox" : "")
            }
          >
            <img className="newHtmlIcon" src="js.svg" />
            <div className="newIconTitle">JavaScript</div>
            <div
              className="newIconOpenBtn"
              onClick={() => {
                this.setState({ isJsMenuOpen: !this.state.isJsMenuOpen });
              }}
            >
              <i className="fas fa-angle-down arrowDown"></i>
            </div>
            <div className="iconDropdown">
              <div className="aboutIconTextWrapper">
                <div className="aboutIconBullet">•</div>
                <div className="aboutIconText">jhk kjh kjh kjh kjh kj</div>
              </div>
              <div className="aboutIconTextWrapper">
                <div className="aboutIconBullet">•</div>
                <div className="aboutIconText">jhk kjh kjh kjh kjh kj</div>
              </div>
            </div>
          </div>

          <div className="extraBox"></div>

          <div
            className="goToPortfolioBtn"
            onClick={() => {
              this.viewPage("portfolio");
            }}
          >
            View My Work
          </div>
        </div>

        <div
          id="portfolioBox"
          className={
            this.state.page == "portfolio" && this.state.isMenuOpen == false
              ? "openBox"
              : ""
          }
        >
          <div className="portfolioTitle">Projects</div>
          <div
            className={
              "project1Box " +
              (this.state.openOrthoProject == true ? "openProjectBox" : "")
            }
          >
            <a
              className="orthoProject"
              target="_blank"
              href="https://www.bracesspecialist.com/"
            >
              <div className="orthoOverlay">
                <img className="orthoLogo" src="./orthoLogo.svg" />
                <div className="project1Title">
                  <div className="orthoTopTitle">Orthodontic</div>
                  <div className="orthoBottomTitle">SPECIALTY CENTER</div>
                </div>
              </div>
              <div
                className="orthoViewBtn"
                onClick={(event) => {
                  // Prevents any "default" action/behavior
                  // Default actions come automatically from our HTML (i.e. <a> tag click actions)
                  event.preventDefault();
                  this.setState({
                    openOrthoProject: !this.state.openOrthoProject,
                  });
                }}
              >
                <i className="fas fa-angle-down projectArrowDown"></i>
              </div>
            </a>

            <div className="orthoProjectContent">
              <div className="orthoProjectText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                expedita. Nihil rerum corrupti quisquam quos explicabo est velit
                non maxime distinctio? At exercitationem vero praesentium
                veritatis dolore, excepturi tempore quae.
              </div>

              <div className="beforeAfterImgs">
                <div className="beforeImgBox">
                  <div className="beforeImgText">Before</div>
                  <img className="beforeSiteImg" src="./before1.png" />
                </div>
                <div className="afterImgWrapper">
                  <div className="beforeImgBox">
                    <div className="beforeImgText">After</div>
                    <img className="beforeSiteImg" src="./after1.png" />
                  </div>
                  <div className="beforeAfterArrow">
                    {/* <i className="fas fa-long-arrow-alt-down"></i> */}
                    <img className="arrowImg" src="./customArrow.svg" />
                  </div>
                </div>
              </div>

              <div className="orthoProjectText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                expedita. Nihil rerum corrupti quisquam quos explicabo est velit
                non maxime distinctio? At exercitationem vero praesentium
                veritatis dolore, excepturi tempore quae.
              </div>
            </div>

            {/* <video className="phoneVideo" autoplay controls>
              <source src="./video2.mp4" type="video/mp4" />
            </video> */}
          </div>

          {/* <div className=""></div> */}
        </div>

        <div
          id="contactBox"
          className={
            this.state.page == "contact" && this.state.isMenuOpen == false
              ? "openBox"
              : ""
          }
        >
          <div className="formTitle">Let's Get In Touch</div>
          <div className="formOption">
            <label htmlFor="nameInput" className="contactFormText unselectable">
              Name<span className="formAsterik">*</span>
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
              htmlFor="messageInput"
              className="contactFormText unselectable"
            >
              Message<span className="formAsterik">*</span>
            </label>
            <textarea
              required
              className="contactFormInput"
              id="messageInput"
              placeholder="What's on your mind?"
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

        <div
          className={
            "navToggleBtn " +
            (this.state.isMenuOpen == false && this.state.page == "landing"
              ? "displayHidden"
              : "")
          }
          onClick={this.toggleMenu}
        >
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
      </div>
    );
  }
}

export default App;
