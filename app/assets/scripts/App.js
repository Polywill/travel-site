import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
new StickyHeader();
let modal;

document.querySelectorAll(".open-modal").forEach(element => {
  element.addEventListener("click", evt => {
    evt.preventDefault();
    if (typeof modal == "undefined") {
      import(/* webpackChunkName: "modal" */ "./modules/Modal").then(_modal => {
        modal = new _modal.default();
        setTimeout(() => modal.openTheModal(), 20);
      }).catch(e => console.log("There was an error : " + e));
    } else {
      modal.openTheModal();
    }
  })
});

if (module.hot) {
  module.hot.accept();
}