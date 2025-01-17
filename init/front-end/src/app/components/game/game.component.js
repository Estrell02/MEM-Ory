import { parseUrl } from "../../scripts/utils";
import { Component } from "../../scripts/component";
import { CardComponent } from "./card/card.component";
import template from "./game.component.html";
import "./game.component.css";
import * as localforage from "localforage/dist/localforage";


var environment = {
  api: {
    host: "http://localhost:8081",
  },
};

/* class GameComponent constructor */

export class GameComponent extends Component {
  constructor() {
    super(template)
    // gather parameters from URL
    const params = parseUrl();

    // save player name & game ize
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  /* method GameComponent.init */
  async init() {
    this._cards = JSON.parse(await localforage.getItem("cards"));
    this._matchedPairs = JSON.parse(await localforage.getItem("score")) || 0;

    if (this._cards) {
      this._cards = this._cards.map(
        (card) => new CardComponent(card._id, card.matched, card.flipped)
      );
      this._cards.forEach((card) => {
        if (card.flipped) {
          card.flipInit();
        }
      });
    } else {
      this._config = await this.fetchConfig();
      this._cards = this._config.ids.map((id) => new CardComponent(id));
      await localforage.setItem("cards", JSON.stringify(this._cards.map((card) => {
        return {
          _id: card._id,
          matched: card.matched,
          flipped: card.flipped
        };
      }
      )));
    }

    this._boardElement = document.querySelector(".cards");

    this._cards.forEach(card => {
      this._boardElement.appendChild(card.getElement());
      card.getElement().addEventListener(
        "click",
        () => {
          this._flipCard(card);
        }
      );
    });
    this.start();
  };

  /* method GameComponent.start */
  start() {
    this._startTime = Date.now();
    let seconds = 0;
    document.querySelector("nav .navbar-title").textContent =
      `Player: ${this._name}. Elapsed time: ${seconds++}`;

    this._timer = setInterval(
      () => {
        document.querySelector("nav .navbar-title").textContent =
          `Player: ${this._name}. Elapsed time: ${seconds++}`;
      },
      1000
    );
  };

  async fetchConfig() {
    const response = await fetch(`${environment.api.host}/board?size=${this._size}`, {
      method: 'GET'
    });
    console.log(response);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  };

  /* method GameComponent.goToScore */
  goToScore() {
    localforage.removeItem("score");
    localforage.removeItem("cards");
    const timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(() => {
      const scorePage = './#score';
      const time = timeElapsedInSeconds;
      this._postScore(time);
      window.location = `${scorePage}?name=${this._name}&size=${this._size}&time=${time}`;
    },
      750
    );
  };

  /* method GameComponent._flipCard */
  _flipCard(card) {
    if (this._busy) {
      return;
    }
    
    if (card.flipped) {
      return;
    }

    // flip the card
    card.flip();

    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...

      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;

        // reset flipped card for the next turn.
        this._flippedCard = null;

        if (this._matchedPairs === this._size) {
          this.goToScore();
        } else {
          localforage.setItem("cards", JSON.stringify(this._cards.map((card) => {
            return {
              _id: card._id,
              matched: card.matched,
              flipped: card.flipped
            };
          })));
  
          localforage.setItem("score", JSON.stringify(this._matchedPairs));
        }
      } else {
        this._busy = true;

        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
          () => {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;

            // reset flipped card for the next turn.
            this._flippedCard = null;
          },
          500
        );
      }
    }
  };

  async _postScore(time) {
    const score = {
      name: this._name,
      size: this._size,
      time: time
    };
    console.log(score);
    try {
      const response = await fetch(`${environment.api.host}/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(score),
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log("Score saved", data);
      } else {  
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

}

