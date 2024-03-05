// TODO #import-html: use ES default imports to import welcome.html as template
import template from "../views/welcome.html";
import { Component } from "./component";

/* class WelcomeComponent constructor  */
export class WelcomeComponent extends Component {
  // TODO #import-html: assign template to this.template
  constructor() {
    super(template);
  }

  init() {
    var form = document.querySelector("form.form-signin");

    form.addEventListener(
      "submit",
      // TODO #arrow-function: use arrow function instead.
      function (event) {
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          var name = event.srcElement.querySelector("#nickname").value;
          var size = parseInt(event.srcElement.querySelector("#size").value);

          this._startGame(name, size);
        }
      }.bind(this),
      false
    );

    return this;
  }

  _startGame(name, size) {
    var gamePage = "./#game";
    // TODO #template-literals:  use template literals (backquotes)
    window.location = gamePage + "?name=" + name + "&size=" + size;
  }
}

// TODO #export-functions: remove this line
// put component in global scope, to be runnable right from the HTML.
window.WelcomeComponent = WelcomeComponent;
