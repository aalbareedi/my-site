import React from "react";
import "./normalize.css";
import "./hamburgers.css";
import "./style.css";
import "./mobile.css";

import AliceCarousel, { slidePrev } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import SocialMediaLink from "./components/socialMediaLink";
import WebSkill from "./components/webSkill";
import AboutMeCard from "./components/aboutMeCard";
import ScrollReveal from "scrollreveal";

import {
  enableScroll,
  disableScroll,
  scrollToY,
  fetchWithTimeout,
} from "./functions.js";

window.isMouseDown = false;

class App extends React.Component {
  carousel = React.createRef();
  aboutSection = React.createRef();
  portfolioSection = React.createRef();
  contactSection = React.createRef();
  webGraphics = React.createRef();
  carouselTouchStartX = 0;
  isMouseDown = false;
  isNavigating = false;

  state = {
    currentSection: "",
    isMenuOpen: false,
    isHtmlMenuOpen: false,
    isCssMenuOpen: false,
    isJsMenuOpen: false,
    openOrthoProject: true,
    isScrolled: false,
    hasEverScrolled: false,
    isAnimating: false,
    nameInputValue: "",
    emailInputValue: "",
    messageInputValue: "",
    isFormLoading: false,
    overlayIcon: "",
    overlayTitle: "",
    overlayMessage: "",
    carouselAutoPlay: true,
    webGraphicsVisible: false,
    navBtnVisible: false,
  };

  viewSection = (section) => {
    this.setState({ isMenuOpen: false });
  };

  toggleMenu = (event) => {
    event.stopPropagation();

    if (this.state.isMenuOpen == false) {
      this.setState({ isMenuOpen: true });
      disableScroll();
    } else {
      this.setState({ isMenuOpen: false });
      enableScroll();
    }
  };

  sendEmail = () => {
    // encodeURIComponent converts forwardslashes (/) to a useable text so it doesnt break the url query string
    let fullName = encodeURIComponent(this.state.nameInputValue);
    let emailAddress = encodeURIComponent(this.state.emailInputValue);
    let message = encodeURIComponent(this.state.messageInputValue);
    let isLoading = true;
    // stopping overlay from appearing for a split second in case emails sends right away
    setTimeout(() => {
      if (isLoading == true) {
        this.setState({ isFormLoading: true });
      }
    }, 500);

    // fetch is JS function that sends http requests to servers,
    // we are REQUESTING sendEmail.php FILE from server to send the email through
    fetchWithTimeout(
      "api/sendEmail.php?name=" +
        fullName +
        "&email=" +
        emailAddress +
        "&msg=" +
        message,
      {},
      5000
    )
      // handles servers succesful response
      .then((response) => {
        isLoading = false;
        this.setState({ isFormLoading: false });
        disableScroll();
        if (response.status != 200) {
          this.setState({ overlayMessage: "Error " + response.status });
          setTimeout(() => {
            this.setState({ overlayMessage: "" });
          }, 4000);
        } else {
          this.setState({
            overlayIcon: "far fa-check-circle confirmIcon",
            overlayTitle: "Message Sent",
            overlayMessage: "Thank You!",
          });
          // confirmWindow.classList.add("visibleConfirmWindow");
          // confirmWindow.classList.add("slide-in-left");

          // close/reset contact form & overlays
          setTimeout(() => {
            // confirmWindow.classList.remove("visibleConfirmWindow");
            this.setState({
              overlayMessage: "",
              nameInputValue: "",
              emailInputValue: "",
              messageInputValue: "",
            });
            enableScroll();
            // confirmWindow.classList.remove("slide-in-left");
            // confirmWindow.classList.remove("slide-out-right");
          }, 3000);
        }
      })
      // handling errors (server connection)
      // handles server if it doesnt respond OR if it responds with an error
      .catch((error) => {
        isLoading = false;
        this.setState({ isFormLoading: false });
        console.log(error);
        console.log(typeof error);
        console.log(Object.getOwnPropertyNames(error));
        console.log(error.message);

        disableScroll();

        if (navigator.onLine == false) {
          this.setState({
            overlayIcon: "fas fa-wifi errorIcon",
            overlayTitle: "Connection Error",
            overlayMessage: "Check your internet connection",
          });
        } else {
          this.setState({
            overlayIcon: "fas fa-exclamation-triangle errorIcon",
            overlayTitle: "Error",
            overlayMessage: "Please try again",
          });
        }
        setTimeout(() => {
          this.setState({
            overlayIcon: "",
            overlayTitle: "",
            overlayMessage: "",
          });
          enableScroll();
        }, 4000);
      });
  };

  componentDidMount() {
    // Remove Gray Highlight When Tapping Links in Mobile Safari
    document.addEventListener("touchstart", function () {}, true);

    window.onscroll = (e) => {
      // window.scrollY = top of screen
      if (window.scrollY > 10 && this.state.isAnimating == false) {
        this.setState({ isScrolled: true, hasEverScrolled: true });
      } else {
        this.setState({ isScrolled: false });
      }

      if (window.scrollY > 0) {
        this.setState({ navBtnVisible: true });
      }

      if (this.isNavigating == false) {
        if (window.scrollY >= this.contactSection.current.offsetTop - 60) {
          this.setState({ currentSection: "contact" });
        } else if (
          window.scrollY >=
          this.portfolioSection.current.offsetTop - 70
        ) {
          this.setState({ currentSection: "portfolio" });
        } else if (
          window.scrollY >=
          this.aboutSection.current.offsetTop - 100
        ) {
          this.setState({ currentSection: "about" });
        } else {
          this.setState({ currentSection: "" });
        }
      }
    };

    // from bottom up
    ScrollReveal().reveal(".scrollReveal", {
      viewOffset: {
        bottom: 60,
      },
      distance: "30px",
    });
    // from left
    ScrollReveal().reveal(".scrollRevealX", {
      origin: "left",
      distance: "30px",
      viewOffset: {
        bottom: 60,
      },
    });
    ScrollReveal().reveal(".responsiveWeb", {
      viewOffset: {
        bottom: 60,
      },
      duration: 0,
      afterReveal: () => {
        this.setState({ webGraphicsVisible: true });
      },
    });
  }

  render() {
    return (
      <div>
        <div className="fixedBg"></div>
        <div
          id="wrapper"
          className="fadeIn"
          onTouchStart={() => {
            window.isMouseDown = true;
            this.setState({ isAnimating: false });
          }}
          onTouchEnd={() => {
            window.isMouseDown = false;
          }}
        >
          <div id="aboutSection">
            <div>
              <div className="intro">
                <div className="introLine">Hello! My name is</div>
                <div className="myNameValue"> Amer Albareedi</div>
              </div>
            </div>

            <div className="effectGraphic">
              <img
                className="ImgEffectR ImgEffect"
                src="svgs/newEffectStretch.svg"
              />
              <img className="ImgEffectL ImgEffect" src="svgs/newEffect.svg" />
              <img className="faceGraphic" src="svgs/newProfile.svg" />
              <img className="ImgEffectR ImgEffect" src="svgs/newEffect.svg" />
              <img
                className="ImgEffectL ImgEffect"
                src="svgs/newEffectStretch.svg"
              />
            </div>
            <div>
              <div className="introDescription">
                I am a Front-End Web Developer helping businesses establish an
                impactful online presence by creating high-quality websites
                optimized to best serve their users.
              </div>

              <div
                className={
                  "icon-scroll " +
                  (this.state.isScrolled == true ? "hidden" : "")
                }
              >
                <div className="icon-arrows">
                  <span></span>
                </div>
              </div>

              <div
                className={
                  "responsiveWeb " +
                  (this.state.webGraphicsVisible == true
                    ? "revealChildren"
                    : "") +
                  " " +
                  (this.state.hasEverScrolled == true ? "hasEverScrolled" : "")
                }
                ref={this.webGraphics}
              >
                <img
                  className="responWebImg webMobileImg"
                  src="svgs/mobile.svg"
                />
                <img
                  className="responWebImg webTabletImg"
                  src="svgs/tablet.svg"
                />
                <img
                  className="responWebImg webLaptopImg"
                  src="svgs/laptop.svg"
                />
                <img
                  className="responWebImg webDesktopImg"
                  src="svgs/desktop.svg"
                />
                <img
                  className="responWebImg stroke strokeImg1"
                  src="svgs/stroke2.svg"
                />
                <img
                  className="responWebImg stroke strokeImg2"
                  src="svgs/stroke2.svg"
                />
                <img
                  className="responWebImg stroke strokeImg3"
                  src="svgs/stroke2.svg"
                />
                <div className="webText">
                  Responsive <span>Web Design</span>
                </div>
              </div>

              <div id="about" className="scrollReveal" ref={this.aboutSection}>
                About Me
              </div>

              <div className="aboutIntroText scrollReveal">
                Being able to build websites has been a dream of mine ever since
                I can remember while surfing the web in the early 2000's. From
                the dial-up tone, to dodging pop-ups, and getting disconnected
                whenever the phone rang, I had assumed that developing a website
                was rocket science. Years later, I picked up graphic design and
                became fascinated with UI/UX, collectively sparking my affinity
                towards learning front-end development. Deconstructing and
                recreating popular websites helped me decipher the "magic"
                behind the world wide web. With tons of practice on modern day
                concepts under my belt, I have a solid foundation of the
                fundamentals required to being an asset on any team. I am ready
                to work and desire the opportunity in achieving success.
              </div>

              <div className="quote scrollReveal">
                <i className="fas fa-quote-left aboutLeftQuote"></i>
                <div className="aboutMeQuote">Progression is my obsession.</div>
                <span className="underline"></span>
              </div>

              <div
                className="carouselContainer"
                onTouchStart={(event) => {
                  this.carouselTouchStartX = event.touches[0].clientX;
                  this.setState({ carouselAutoPlay: false });
                }}
                onTouchMove={(event) => {
                  let startX = this.carouselTouchStartX;
                  let x = event.touches[0].clientX;

                  if (Math.abs(startX - x) > 30) {
                    disableScroll();
                  }
                }}
                onTouchEnd={(event) => {
                  enableScroll();
                }}
              >
                <AliceCarousel
                  ref={(element) => {
                    this.carousel = element;
                  }}
                  // disableButtonsControls={true}
                  // disableAutoPlayOnAction={true}
                  autoPlay={this.state.carouselAutoPlay}
                  autoPlayStrategy={"all"}
                  autoPlayInterval={3000}
                  mouseTracking={true}
                  infinite={true}
                >
                  <AboutMeCard
                    imgSrc="svgs/user.svg"
                    aboutMeTitle="User-Focused"
                    aboutMeMessage="Recognizing user tendencies is essential for designing productive interactions."
                  />
                  <AboutMeCard
                    imgSrc="svgs/think1.svg"
                    aboutMeTitle="Critical Thinker"
                    aboutMeMessage="Turning an idea into reality requires being well versed in
                  solving a variety of problems that may arise."
                  />
                  <AboutMeCard
                    imgSrc="svgs/heart1.svg"
                    aboutMeTitle="Passionate"
                    aboutMeMessage="My love for technology keeps me constantly curious and dedicated to mastering my craft."
                  />
                </AliceCarousel>
              </div>

              <div className="skillsTitle scrollRevealX">Skills</div>
              <div className="webSkills">
                <WebSkill iconImg="svgs/html.svg" iconTitle="HTML">
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
                  <div className="aboutIconTextWrapper">
                    <div className="aboutIconBullet">•</div>
                    <div className="aboutIconText">
                      Cross browser compatibility.
                    </div>
                  </div>
                </WebSkill>

                <WebSkill
                  id="cssWebSkill"
                  iconImg="svgs/css.svg"
                  iconTitle="CSS"
                >
                  <div className="webSkillContainer">
                    <div className="aboutIconTextWrapper">
                      <div className="aboutIconBullet">•</div>
                      <div className="aboutIconText">
                        Proficient understanding of The Box Model, along with
                        Flexbox, Grid, & position.
                      </div>
                    </div>
                    <div className="aboutIconTextWrapper">
                      <div className="aboutIconBullet">•</div>
                      <div className="aboutIconText">DOM-based animation.</div>
                    </div>
                  </div>
                  <div className="appIconsWrapper">
                    <div className="aboutWebIcon">
                      <img className="webskillIcon" src="svgs/bootstrap.svg" />
                      <div className="webSkillIconText">Bootstrap</div>
                    </div>
                    <div className="aboutWebIcon">
                      <img className="webskillIcon" src="svgs/sass.svg" />
                      <div className="webSkillIconText">SASS</div>
                    </div>
                  </div>
                </WebSkill>

                <WebSkill
                  id="jsWebSkill"
                  iconImg="svgs/js.svg"
                  iconTitle="JavaScript"
                >
                  <div className="aboutIconTextWrapper">
                    <div className="aboutIconBullet">•</div>
                    <div className="aboutIconText">
                      Making the DOM functional.
                    </div>
                  </div>
                  <div className="aboutIconTextWrapper">
                    <div className="aboutIconBullet">•</div>
                    <div className="aboutIconText">
                      CRUD experience with using fetch.
                    </div>
                  </div>
                  <div className="appIconsWrapper">
                    <div className="aboutWebIcon">
                      <img className="webskillIcon" src="svgs/react.svg" />
                      <div className="webSkillIconText">React</div>
                    </div>
                    <div className="aboutWebIcon">
                      <img className="webskillIcon" src="svgs/jQuery.svg" />
                      <div className="webSkillIconText">jQuery</div>
                    </div>
                  </div>
                </WebSkill>
              </div>

              <div className="extraBox scrollReveal">
                <div className="extraSkillsTitle">Design Tools</div>
                <div className="extraIconGrid">
                  <div className="aboutWebIcon">
                    <img className="webskillIcon" src="svgs/illustrator.svg" />
                    <div className="designIconText">Illustrator</div>
                  </div>
                  <div className="aboutWebIcon">
                    <img className="webskillIcon" src="svgs/photoshop.svg" />
                    <div className="designIconText">Photoshop</div>
                  </div>
                </div>
              </div>

              <div className="socialMediaWrapper">
                <div className="landingSocialMedia">
                  <SocialMediaLink
                    url="https://github.com/aalbareedi"
                    icon="fa-github"
                    text="Github"
                  />
                  <SocialMediaLink
                    url="https://www.instagram.com/sir.real/"
                    icon="fa-instagram"
                    text="Instagram"
                  />
                  <SocialMediaLink
                    url="https://www.instagram.com/sir.real/"
                    icon="fa-linkedin-in"
                    text="LinkedIn"
                  />
                </div>
                <div className="checkSocialMedia">
                  Check out my social medias
                </div>
              </div>
            </div>
          </div>

          <div id="portfolio" ref={this.portfolioSection}>
            <div>
              <div className="portfolioTitle scrollRevealX">Projects</div>
              <div
                className={
                  "project1Box scrollRevealX " +
                  (this.state.openOrthoProject == true ? "openProjectBox" : "")
                }
              >
                <a
                  className="orthoProject"
                  target="_blank"
                  href="https://www.bracesspecialist.com/"
                >
                  <span className="btnFocus" tabIndex="-1">
                    <div className="orthoOverlay">
                      <img className="orthoLogo" src="./svgs/orthoLogo.svg" />
                      <div className="project1Title">
                        <div className="orthoTopTitle">Orthodontic</div>
                        <div className="orthoBottomTitle">SPECIALTY CENTER</div>
                      </div>
                    </div>
                    <button
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
                      <span className="btnFocus" tabIndex="-1">
                        <i className="fas fa-angle-down projectArrowDown"></i>
                      </span>
                    </button>
                  </span>
                </a>

                <div className="orthoProjectContent">
                  <a
                    tabIndex={
                      this.state.openOrthoProject == true ? undefined : -1
                    }
                    className="orthoVisitLink orthoLink"
                    target="_blank"
                    href="https://www.bracesspecialist.com/"
                  >
                    Visit <i className="fas fa-share"></i>
                  </a>
                  <a
                    tabIndex={
                      this.state.openOrthoProject == true ? undefined : -1
                    }
                    className="orthoGithubLink orthoLink"
                    target="_blank"
                    href="https://github.com/aalbareedi/braces-specialist"
                  >
                    &lt;View Code/&gt;
                  </a>
                  <div className="orthoProjectText">
                    <span className="overviewSpan">Objective:</span> Modernize a
                    website which is from the early 90's for one of Chicago's
                    top dental clinics.
                  </div>

                  <div className="beforeAfterImgs">
                    <div className="resultImgBox">
                      <div className="resultImgText">Before</div>
                      <img className="resultImg" src="./before2.png" />
                    </div>
                    <div className="resultImgBox">
                      <div className="resultImgText">After</div>
                      <img className="resultImg" src="./after1.png" />
                      <div className="beforeAfterArrow">
                        <img
                          className="arrowImg"
                          src="./svgs/customArrow.svg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="orthoProjectText">
                    <span className="overviewSpan">Process:</span>&nbsp;The
                    first step in starting this project was identifying the main
                    aspects that contribute to crafting an efficient online
                    interaction. After reviewing research, I was able to
                    recognize who is the target audience, what is the company's
                    overall intended goal, and which content needs to be
                    displayed. Upon confirming the most user-friendly layout, it
                    was time to start coding. I proceeded with a mobile-first
                    approach as I believe prioritizing the mobile experience is
                    absolutely essential in this day and age. I chose not to use
                    any pre-existing templates guaranteeing complete control of
                    customization, in addition to putting my skills to the test
                    in making sure they are up to par.
                  </div>

                  <div className="orthoProjectText">
                    <span className="overviewSpan">Outcome:</span>&nbsp;Since
                    launching the renovated website, the results produced have
                    exceeded expectations beyond what anyone had imagined.
                    Within the first 6 months, the clinic set a personal
                    all-time record for the most amount of new cases initiated
                    in a single day ranging over a 30+ year span. There also was
                    a significant increase in the average amount of new patients
                    reported to discovering the clinic through Google. This goes
                    to show that the Search Engine Optimization of the website
                    was thoroughly accounted for and meets modern standards.
                    Being able to boost a local business with a website that is
                    aesthetically pleasing while functionally performing
                    inspires me to continue grinding in becoming a top-tier
                    developer, so that I can continue to help hardworking
                    professionals grow their business online.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" ref={this.contactSection}>
            <div>
              <div className="formTitle">Let's Get To Work</div>
              <div className="formText">
                Send me a message below and I will get back to you with an email
                ASAP
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  this.sendEmail();
                }}
              >
                <div className="formOption">
                  <div className="fullNameField">
                    <input
                      required
                      id="nameInput"
                      type="text"
                      className="contactFormInput"
                      placeholder=" "
                      onChange={(event) => {
                        this.setState({ nameInputValue: event.target.value });
                      }}
                      // to clear the input
                      value={this.state.nameInputValue}
                    />
                    <div className="inputPlaceholder">Full Name</div>
                    <div className="formIcon" id="fullNameIcon">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                </div>

                <div className="formOption">
                  <div className="emailField">
                    <input
                      required
                      id="emailInput"
                      type="email"
                      className="contactFormInput"
                      placeholder=" "
                      pattern=".+@.+\..{2,}$"
                      onChange={(event) => {
                        this.setState({ emailInputValue: event.target.value });
                      }}
                      value={this.state.emailInputValue}
                    />
                    <div className="inputPlaceholder">Email Address</div>
                    <div className="formIcon" id="emailIcon">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                </div>

                <div className="messageWrapper">
                  <div className="formMessage">
                    <textarea
                      required
                      className="contactFormInput"
                      id="messageInput"
                      placeholder=" "
                      onChange={(event) => {
                        this.setState({
                          messageInputValue: event.target.value,
                        });
                      }}
                      value={this.state.messageInputValue}
                    ></textarea>
                    <div className="inputPlaceholder">What's on your mind?</div>
                  </div>
                </div>

                <div className="formBtns">
                  <button className="sendBtn" type="submit">
                    <span className="btnFocus" tabIndex="-1">
                      Send
                    </span>
                  </button>
                </div>
              </form>
              <footer>
                <button
                  className="backToTopBtn"
                  onClick={() => {
                    scrollToY(this, 0);
                    this.setState({ currentSection: "" });
                  }}
                >
                  <span className="btnFocus" tabIndex="-1">
                    <i className="fas fa-arrow-up backToTopIcon"></i>
                    Back To Top
                  </span>
                </button>
              </footer>
            </div>
          </div>

          <div
            id="loadingOverlay"
            className={
              "formOverlay " +
              (this.state.isFormLoading == true ? "" : "displayHidden")
            }
          >
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
            </div>
          </div>

          <div
            className={
              "formOverlay " +
              (this.state.overlayMessage == "" ? "displayHidden" : "")
            }
          >
            <div className="formOverlayWindow">
              <div className="overlayIconWrapper">
                <i className={this.state.overlayIcon}></i>
              </div>
              <div className="formOverlayMessage">
                {this.state.overlayTitle}
              </div>
              <div className="formOverlayText">{this.state.overlayMessage}</div>
            </div>
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
              this.setState({ isMenuOpen: false, currentSection: "about" });
              scrollToY(this, this.aboutSection.current.offsetTop - 80);
              enableScroll();
            }}
          >
            About
          </div>
          <div
            id="portfolioLink"
            className="navMenuOption unselectable"
            onClick={() => {
              this.setState({ isMenuOpen: false, currentSection: "portfolio" });
              scrollToY(this, this.portfolioSection.current.offsetTop - 50);
              enableScroll();
            }}
          >
            Portfolio
          </div>
          <div
            id="contactLink"
            className="navMenuOption unselectable"
            onClick={() => {
              this.setState({ isMenuOpen: false, currentSection: "contact" });
              scrollToY(this, this.contactSection.current.offsetTop - 50);
              enableScroll();
            }}
          >
            Contact
          </div>
        </div>

        <div
          className={
            "navLogoBar " +
            (this.state.isMenuOpen == true || this.state.isScrolled == true
              ? "openNavLogoBar"
              : "")
          }
          onClick={() => {
            this.setState({
              isMenuOpen: false,
              isScrolled: false,
              currentSection: "",
            });
            scrollToY(this, 0);
            enableScroll();
          }}
        >
          <img className="navLogoImg" src="svgs/nameLogo.svg" />
          <div className="navMyName">Amer Albareedi</div>
          <div className="navJobTitle">Front-End Web Developer</div>
          <div className="desktopNav">
            <a
              href="#about"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                this.setState({ currentSection: "about" });
                scrollToY(this, this.aboutSection.current.offsetTop - 100);
              }}
              className={
                this.state.currentSection == "about" ? "currentNav" : ""
              }
            >
              About
            </a>
            <a
              href="#portfolio"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                this.setState({ currentSection: "portfolio" });
                scrollToY(this, this.portfolioSection.current.offsetTop - 70);
              }}
              className={
                this.state.currentSection == "portfolio" ? "currentNav" : ""
              }
            >
              Portfolio
            </a>
            <a
              href="#contact"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                this.setState({ currentSection: "contact" });
                scrollToY(this, this.contactSection.current.offsetTop - 60);
              }}
              className={
                this.state.currentSection == "contact" ? "currentNav" : ""
              }
            >
              Contact
            </a>
          </div>
        </div>

        <div
          className={
            "navToggleBtn " +
            (this.state.navBtnVisible == false ? "opacityZero" : "")
          }
          onClick={(event) => {
            this.toggleMenu(event);
          }}
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
