// TODO #import-html: use ES default imports to import welcome.html as template
import template from "../welcome/welcome.component.html";
import { Component } from "../../scripts/component";

import "./welcome.component.css";

/* class WelcomeComponent constructor  */
export class WelcomeComponent extends Component {

  constructor() {
    super(template);
  }

  init() {
    const form = document.querySelector("form.form-signin");

    form.addEventListener(
      "submit",

      (event) => {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          let name = event.srcElement.querySelector("#nickname").value;
          let size = parseInt(event.srcElement.querySelector("#size").value);

          this._startGame(name, size);
        }
      },
      false
    );

    return this;
  }

  _startGame(name, size) {
    const gamePage = "./#game";

    window.location = `${gamePage}?name=${name}&size=${size}`;
  }
}

