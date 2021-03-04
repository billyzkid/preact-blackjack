import { h, Component } from 'preact';
import CSSTransitionGroup from 'preact-css-transition-group';

const Info = ({ isWin, winPercentage }) => {
  const getOutcome = (win) => {
    switch (win) {
      case true:
        return 'WIN!';
      case false:
        return 'LOST!';
      case null:
        return 'PUSH!';
    }
  };

  const renderOutcome = (isWin) => {
    return (
      isWin !== undefined && (
        <div className="outcome" data-win={isWin}>
          {getOutcome(isWin)}
        </div>
      )
    );
  };

  return (
    <div className="info">
      {winPercentage && (
        <div className="win-percentage">
          wins
          <strong>{winPercentage}</strong>
        </div>
      )}
      <CSSTransitionGroup
        transitionName="outcome"
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={300}
      >
        {renderOutcome(isWin)}
      </CSSTransitionGroup>
    </div>
  );
};

export default Info;
