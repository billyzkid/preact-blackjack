import { shuffleArray } from '../utils/array';

function createDeck() {
  const deck = [];
  const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  const suits = ['H', 'S', 'C', 'D'];

  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      deck.push({ rank, suit });
    });
  });

  return deck;
}

let _deck = new WeakMap();

export default class Deck {
  constructor() {
    this.create();
  }

  create() {
    _deck.set(this, shuffleArray(createDeck()));
  }

  shuffle() {
    _deck.set(this, shuffleArray(_deck.get(this)));
  }

  get length() {
    return _deck.get(this).length;
  }

  deal() {
    let deck = _deck.get(this);

    if (!deck.length) {
      this.create();
      return this.deal();
    }

    const card = deck.pop();
    _deck.set(this, deck);

    return card;
  }
}
