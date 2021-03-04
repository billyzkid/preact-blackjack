import { h } from 'preact';

const Card = ({ rank, suit, isPrivate }) => {
  const renderContainer = () => {
    return (
      <div className="container">
        <span className="rank">{rank}</span>
        <span className="suit">{suit}</span>
      </div>
    );
  };

  const renderFront = () => {
    return (
      <div className="front">
        <div className="section top">{renderContainer()}</div>
        <div className="section center suit">{suit}</div>
        <div className="section bottom">{renderContainer()}</div>
      </div>
    );
  };

  return (
    <div className={`card ${suit}`} data-private={isPrivate}>
      {!isPrivate && renderFront()}
      <div className="back"></div>
    </div>
  );
};

export default Card;
