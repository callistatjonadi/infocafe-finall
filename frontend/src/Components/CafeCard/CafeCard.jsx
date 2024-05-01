import React from "react";
import css from "./CafeCard.module.css"; // Ensure this path correctly points to your CSS module
import { useNavigate } from "react-router-dom";

const CafeCard = ({ cafe, viewDetail }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/cafe/detail/${cafe.id}`);
  };

  return (
    <div className={css.cafeCardContainer}>
      <div className={css.cafeCard}>
        <div className={css.cafeImageContainer}>
          <img src={`/images/cafes/${cafe.image}`} alt={cafe.name} />
        </div>
        <h4 className={css.cafeTitle}>{cafe.name}</h4>
        <div className={css.description}>
          <p>{cafe.description}</p>
        </div>
        <div className={css.address}>
          <p>{cafe.address}</p>
        </div>
        <div className={css.address}>
          <p>{cafe.distance}km</p>
        </div>
        {viewDetail && (
          <button className={css.cafeDetailButton} onClick={handleClick}>
            View Detail
          </button>
        )}

        <label className={css.cafeId} style={{ visibility: "hidden" }}>
          {cafe.id}
        </label>
      </div>
    </div>
  );
};

export default CafeCard;
