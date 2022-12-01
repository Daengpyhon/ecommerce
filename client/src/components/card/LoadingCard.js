import React from "react";
import { Skeleton, Card } from "antd";
function LoadingCard({ count }) {
  const loopCard = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <div className="col-sm-12 col-md-4 col-lg-3" key={i}>
          <Card>
            <Skeleton active />
          </Card>
        </div>
      );
    }
    return cards;
  };

  return (
    <>
      <div className="row justify-content-center">{loopCard()}</div>
    </>
  );
}

export default LoadingCard;
