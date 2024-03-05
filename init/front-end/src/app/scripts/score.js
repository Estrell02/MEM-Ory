// TODO #import-html: use ES default imports to import game.html as template
import template from "../views/score.html"
import {Component} from "./component";
  /* class ScoreComponent constructor */
  import { parseUrl } from "./utils";
 export class ScoreComponent extends Component{
   
   constructor(){
    var params = parseUrl();
    // TODO #import-html: assign template to this.template
    super(template);
    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
   }
init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
  };
  }

  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.
  window.ScoreComponent = ScoreComponent;


 

