import { h, Component } from 'preact';
import Info from './Info.jsx';
import Hand from './Hand.jsx';
import Controls from './Controls.jsx';
import { calculateWinPercentage } from '../game/index.js';

const RESET_ROUND_TIME = 3000;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winCount: 0,
      roundCount: 0,
      inProgress: false,
      playerHand: [],
      dealerHand: [],
      winPercentage: false,
      isWin: undefined
    };
  }

  onDeal() {
    let { deck, playerHand, dealerHand } = this.props;
    const { roundCount } = this.state;

    this.clearTimeout();
    this.resetRound();

    if (roundCount % 6 === 0) {
      deck.shuffle();
    }

    playerHand.draw(deck.deal());
    dealerHand.draw(deck.deal());
    playerHand.draw(deck.deal());
    dealerHand.draw(deck.deal());

    // set state to update the view
    this.setState(
      (prevState, props) => {
        console.log(prevState);
        return {
          playerHand: playerHand.cards,
          dealerHand: [dealerHand.cards[0], { rank: 'dummy', suit: '' }],
          playerScore: playerHand.scoreTotal,
          roundCount: ++prevState.roundCount,
          inProgress: true
        };
      },
      () => {
        // automatically stand if blackjack
        return playerHand.hasBlackjack ? this.onStand() : null;
      }
    );
  }

  onHit() {
    let { deck, playerHand } = this.props;

    playerHand.draw(deck.deal());

    // update the view
    this.setState(
      {
        playerHand: playerHand.cards,
        playerScore: playerHand.scoreTotal
      },
      () => {
        // automatically stand if bust
        return playerHand.isBust ? this.onStand() : null;
      }
    );
  }

  onStand() {
    const { playerHand, deck, getWinner, dealerDrawing } = this.props;
    let { dealerHand } = this.props;

    dealerDrawing(dealerHand, deck, playerHand);

    // prepare state to be updated
    const dealerScore = dealerHand.scoreTotal;
    const isWin = getWinner(playerHand.scoreTotal, dealerScore);
    const winCount = isWin === true ? ++this.state.winCount : this.state.winCount;
    const winPercentage = calculateWinPercentage(winCount, this.state.roundCount);

    console.log(winPercentage);

    // update the view
    this.setState(
      (prevState, props) => ({
        winCount,
        winPercentage,
        dealerHand: dealerHand.cards,
        dealerScore,
        inProgress: false,
        isWin
      }),
      () => {
        // hide cards and prepare for the next round
        this.timeout = window.setTimeout(() => {
          this.resetRound();
        }, RESET_ROUND_TIME);
      }
    );
  }

  resetRound() {
    const { playerHand, dealerHand } = this.props;

    // clear hands
    playerHand.clear();
    dealerHand.clear();

    // update the view
    this.setState({
      isWin: undefined,
      playerHand: [],
      dealerHand: [],
      playerScore: undefined,
      dealerScore: undefined
    });
  }

  clearTimeout() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  render() {
    const {
      roundCount,
      playerHand,
      playerScore,
      dealerScore,
      dealerHand,
      inProgress,
      isWin,
      winCount,
      winPercentage
    } = this.state;

    return (
      <div className="app">
        <header>
          <Info isWin={isWin} winPercentage={winPercentage} />
        </header>
        <section role="main">
          <Hand cards={dealerHand} score={dealerScore} inProgress={inProgress} owner="dealer" />
          <Hand cards={playerHand} score={playerScore} inProgress={inProgress} owner="player" />
        </section>
        <footer>
          <nav>
            <Controls
              inProgress={inProgress}
              gameOver={isWin !== undefined}
              deal={() => this.onDeal()}
              hit={() => this.onHit()}
              stand={() => this.onStand()}
            />
          </nav>
        </footer>
      </div>
    );
  }
}

export default App;
