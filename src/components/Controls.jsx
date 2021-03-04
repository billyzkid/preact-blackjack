import { h } from 'preact';
import CSSTransitionGroup from '../utils/css-transition-group/index.js';

const Controls = ({ inProgress, gameOver, deal, hit, stand }) => {
  return (
    <div className="controls">
      <CSSTransitionGroup
        transitionName="buttons"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}
      >
        {!inProgress && !gameOver && (
          <div className="button-container">
            <button className="deal" onClick={deal}>
              <i className="icon-right"></i>
              <span>Deal</span>
            </button>
          </div>
        )}

        {(inProgress || (!inProgress && gameOver)) && (
          <div className="button-container">
            <button className="hit" onClick={hit} disabled={gameOver}>
              <i className="icon-right"></i>
              <span>Hit</span>
            </button>
            <button className="stand" onClick={stand} disabled={gameOver}>
              <i className="icon-down"></i>
              <span>Stand</span>
            </button>
          </div>
        )}
      </CSSTransitionGroup>
    </div>
  );
};

export default Controls;
