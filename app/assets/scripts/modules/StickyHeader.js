import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header");
    this.pageSections = document.querySelectorAll(".page-section");
    this.browserHeight = window.innerHeight;
    this.previousScrollY = window.scrollY;
    this.events();
  }

  events() {
    window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));
    window.addEventListener("resize", debounce(() => {
      this.browserHeight = window.innerHeight;
    }, 333
    ));
  }

  runOnScroll() {
    this.determineScrollDirection();

    if (window.scrollY > 60) {
      this.siteHeader.classList.add("site-header--dark");
    } else {
      this.siteHeader.classList.remove("site-header--dark");
    }

    this.pageSections.forEach(section => this.calcSection(section));
  }

  determineScrollDirection() {
    let currentScrollY = window.scrollY;
    if (currentScrollY > this.previousScrollY) {
      this.scrollDirection = "down";
    } else {
      this.scrollDirection = "up";
    }
    this.previousScrollY = currentScrollY;
  }

  calcSection(section) {
    let isTopReached = window.scrollY + this.browserHeight > section.offsetTop;
    let isBottomDown = window.scrollY < section.offsetTop + section.offsetHeight;
    let isSectionInView = isTopReached && isBottomDown;

    if (isSectionInView) {
      let scrollPercent = section.getBoundingClientRect().top / this.browserHeight * 100;
      let isThresholdReached = this.scrollDirection == "down" ?
        scrollPercent < 18 && scrollPercent > -0.1 : scrollPercent < 33;

      if (isThresholdReached) {
        let matchingLink = section.getAttribute("data-matching-link");
        this.clearCurrentLinks();
        document.querySelector(matchingLink).classList.add("is-current-link");
      }

      if (this.previousScrollY < 60)
        this.clearCurrentLinks();
    }
  }

  clearCurrentLinks() {
    document.querySelectorAll(".primary-nav a").forEach(el => el.classList.remove("is-current-link"));
  }
}

export default StickyHeader;