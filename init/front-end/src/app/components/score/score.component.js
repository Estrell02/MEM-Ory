// TODO #import-html: use ES default imports to import game.html as template
import template from "./score.component.html"
import {Component} from "../../scripts/component";

import "./score.component.css";
  /* class ScoreComponent constructor */
  import { parseUrl } from "../../scripts/utils";
 export class ScoreComponent extends Component{
   
   constructor(){
    const params = parseUrl();
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

  
  // put component in global scope, to be runnable right from the HTML.
  window.ScoreComponent = ScoreComponent;


 

