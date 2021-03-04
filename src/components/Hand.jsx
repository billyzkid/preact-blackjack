import { h, Component } from 'preact';
import Card from './Card.jsx';
import CSSTransitionGroup from '../utils/css-transition-group/index.js';

class Hand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDealing: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextIsDealing = nextProps.cards.length <= 2 && nextProps.inProgress;
    if (this.state.isDealing !== nextIsDealing) {
      this.setState({
        isDealing: nextIsDealing
      });
    }
  }

  renderScore(score) {
    return score && <span className="score-value">{score}</span>;
  }

  render() {
    const { score, cards, owner } = this.props;
    const { isDealing } = this.state;

    const dataAttributes = {
      'data-dealing': isDealing,
      'data-owner': owner
    };

    return (
      <div className="hand" {...dataAttributes}>
        <div className="score">
          <CSSTransitionGroup
            transitionName="pop"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={100}
          >
            {this.renderScore(score)}
          </CSSTransitionGroup>
        </div>
        <div className="cards">
          <CSSTransitionGroup
            transitionName="list"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={300}
          >
            {cards.map((card, i) => (
              <Card rank={card.rank} suit={card.suit} isPrivate={card.rank === 'dummy'} key={i} />
            ))}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Hand;
