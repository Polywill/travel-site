import Axios from "axios"

class ClientArea {
  constructor() {
    this.injectHtml();
    this.form = document.querySelector(".client-area__form");
    this.input = document.querySelector(".client-area__input");
    this.contentArea = document.querySelector(".client-area__content-area");
    events();
  }

  events() {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      this.sendRequest();
    })
  }

  sendRequest() {
    Axios.post("https://xenodochial-curran-6ab30b.netlify.app/.netlify/functions/secret-area", { password: this.input.value }).then(response => {
      this.form.remove();
      this.contentArea.innerHTML = response.data;
    }).catch(() => {
      this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again.</p>`;
      this.input.value = "";
      this.input.focus();
    });
  }

  injectHtml() {
    document.body.insertAdjacentHTML("beforeend", `
    
      <div class="client-area">
        <div class="wrapper wrapper--medium">
          <h2 class="section-title section-title--blue">Secret Client Area</h2>
          <form class="client-area__form" action="">
            <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
            <button class="btn btn--orange">Submit</button>
          </form>
          <div class="client-area__content-area"></div>
        </div>
      </div>
    `)
  }
}

export default ClientArea