import { h, render } from 'preact';
import 'preact/devtools';
import App from './components/App.jsx';
import Hand from './game/Hand.js';
import Deck from './game/Deck.js';
import { getWinner, dealerDrawing } from './game/index.js';
import './css/index.scss';

const deck = new Deck();
const dealerHand = new Hand();
const playerHand = new Hand();

render(
  <App
    deck={deck}
    dealerHand={dealerHand}
    playerHand={playerHand}
    getWinner={getWinner}
    dealerDrawing={dealerDrawing}
  />,
  document.getElementById('root')
);
