/*
 * slide-nav 1.0.1
 * ES6 Vanilla.js navigation plugin to simple use on one-page websites.
 * https://github.com/qmixi/slide-nav
 * Copyright (C) 2017 - A project by Piotr Kumorek
 * Released under the MIT license.
 */

class SlideNav {
  constructor(options) {
    //default values
    if (!options) var options = {};
    this.activeClass = options.activeClass || "active";
    this.toggleButtonSelector = options.toggleButtonSelector || false;
    this.toggleBoxSelector = options.toggleBoxSelector || false;
    this.speed = options.speed > 0 ? options.speed : 400;
    this.hideAfterSelect = options.hideBoxAfterSelect || true;
    this.changeHash = options.changeHash || false;
    this.navBoxToggleClass = options.navBoxToggleClass || false;
    this.isAnimating = false;

    //initialize
    this.init();
  }

  init() {
    //scrollDoc
    this.scrollDoc = document.scrollingElement || document.documentElement;

    this.getElements();
    this.observe();
    this.setActiveAnchor();
  }

  getElements() {
    this.toggleButton = document.querySelector(this.toggleButtonSelector);
    if (this.toggleButton) {
      this.opened = false;
    }
    this.toggleBoxes = document.querySelectorAll(this.toggleBoxSelector);
    this.navAnchors = document.querySelectorAll(
      '[href]:not([target="_blank"]):not(link)'
    );
    console.log(this.navAnchors);
  }

  observe() {
    //blur navBox
    window.addEventListener("click", e => {
      if (
        this.opened &&
        !this.isClosestElement(e.target, this.toggleButton) &&
        !this.isBoxNavTarget(e.target)
      ) {
        this.hideNavBox();
      }
    });
    // toggle button
    if (this.toggleButton) {
      this.toggleButton.addEventListener("click", e => {
        setTimeout(() => {
          this.opened ? this.hideNavBox() : this.showNavBox();
        });
      });
    }
    // anchors
    for (let anchor of this.navAnchors) {
      anchor.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        let linkHash = this.getHash(e.currentTarget.getAttribute("href"));
        if (!this.goToSection(linkHash) && e.currentTarget.href)
          this.goToUrl(e.currentTarget.href);
      });
    }
    // scroll
    window.addEventListener("scroll", () => {
      console.log(this.isAnimating);
      if (this.isAnimating == false) {
        this.setActiveAnchor();
      }
    });
  }

  setActiveAnchor() {
    for (let anchor of this.navAnchors) {
      const linkHash = this.getHash(anchor.getAttribute("href")),
        section = this.getSection(linkHash),
        // 58 is the height of the navbar to offset the nav scroll-to effect
        offset = this.scrollDoc.scrollTop + 58 + 20,
        scrollHeight = this.scrollDoc.scrollHeight;

      let sectionOffset = 0;
      let element = section;
      do {
        sectionOffset += element.offsetTop || 0;
        element = element.offsetParent;
      } while (element);

      if (
        section &&
        ((sectionOffset <= offset &&
          sectionOffset + section.offsetHeight > offset) ||
          offset + window.innerHeight == scrollHeight)
      ) {
        for (let link of this.navAnchors) {
          if (link.getAttribute("href") != anchor.getAttribute("href"))
            link.classList.remove("active");
        }
        anchor.classList.add("active");
      }
    }
  }

  goToSection(linkHash) {
    const section = this.getSection(linkHash);
    if (section) {
      // subtract height of navbar
      let offsetTop = -58;
      let element = section;
      do {
        offsetTop += element.offsetTop || 0;
        element = element.offsetParent;
      } while (element);

      this.isAnimating = true;
      this.scrollTo(offsetTop, this.speed);
      if (this.hideAfterSelect) this.hideNavBox();
      if (this.changeHash) {
        history.pushState({}, null, "#" + linkHash);
      }
      return true;
    } else {
      return false;
    }
  }

  scrollTo(destOffset, duration) {
    let that = this;
    $("html, body").animate({ scrollTop: destOffset }, duration, function() {
      that.setActiveAnchor();
      that.isAnimating = false;
    });

    // const diffOffset = destOffset - this.scrollDoc.scrollTop,
    //   partDist = (diffOffset / duration) * 40;
    // if (duration <= 0) {
    //   this.setActiveAnchor();
    //   this.isAnimating = false;
    //   return;
    // }
    // setTimeout(() => {
    //   this.scrollDoc.scrollTop = this.scrollDoc.scrollTop + partDist;
    //   if (this.scrollDoc.scrollTop == destOffset) {
    //     this.setActiveAnchor();
    //     this.isAnimating = false;
    //     return;
    //   }
    //   this.scrollTo(destOffset, duration - 40);
    // }, 40);
  }

  goToUrl(url) {
    return (window.location = url);
  }

  getSection(linkHash) {
    if (linkHash) {
      const id = "#" + linkHash;
      return document.querySelector(id);
    }
    return false;
  }

  getHash(href) {
    return href.split("#")[1];
  }

  isBoxNavTarget(target) {
    var isTarget = false;
    for (let box of this.toggleBoxes) {
      if (this.isClosestElement(target, box)) isTarget = true;
    }
    return isTarget;
  }

  isClosestElement(target, element) {
    while (element != target) {
      target = target.parentNode;
      if (!target) return false;
    }
    return true;
  }

  hideNavBox() {
    for (let box of this.toggleBoxes) {
      if (this.navBoxToggleClass) {
        box.classList.remove(this.navBoxToggleClass);
      } else {
        box.style.display = "none";
      }
    }
    this.opened = false;
  }

  showNavBox() {
    for (let box of this.toggleBoxes) {
      if (this.navBoxToggleClass) {
        box.classList.add(this.navBoxToggleClass);
      } else {
        box.style.display = "block";
      }
    }
    this.opened = true;
  }
}
