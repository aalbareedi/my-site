// Remove Gray Highlight When Tapping Links in Mobile Safari
document.addEventListener("touchstart", function () {}, true);

navToggleBtn.onclick = function () {
  if (navToggleIcon.classList.contains("is-active") == false) {
    navLogoBar.classList.add("openNavLogoBar");
    navToggleIcon.classList.add("is-active");
    navMenu.classList.add("openNavMenu");
  } else {
    navToggleIcon.classList.remove("is-active");
    navMenu.classList.remove("openNavMenu");

    // if nav is open, and toggle Btn is clicked, then close logo bar only if we are on home page & NOT about, portfolio, contact pages.
    if (
      portfolioBox.classList.contains("openBox") == false &&
      contactBox.classList.contains("openBox") == false &&
      aboutBox.classList.contains("openBox") == false
    ) {
      navLogoBar.classList.remove("openNavLogoBar");
    }
  }
};

hireMeBtn.onclick = function () {
  navLogoBar.classList.add("openNavLogoBar");
  portfolioBox.classList.add("openBox");
  landing.classList.remove("openBox");
};

navLogoBar.onclick = function () {
  navLogoBar.classList.remove("openNavLogoBar");
  navigateToPage(landing);
};

aboutLink.onclick = function () {
  navigateToPage(aboutBox);
};

portfolioLink.onclick = function () {
  navigateToPage(portfolioBox);
};

contactLink.onclick = function () {
  navigateToPage(contactBox);
};

// body.onscroll = function () {
//   if (scrollingElement.scrollTop > 0) {
//     backToTopBtn.classList.remove("opacityZero");
//   } else {
//     backToTopBtn.classList.add("opacityZero");
//   }
// };

// backToTopBtn.onclick = function(event) {
//   event.preventDefault();
//   event.stopPropagation();
// };
