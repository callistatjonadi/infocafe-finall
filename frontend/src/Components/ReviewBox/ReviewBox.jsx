import React from "react";
import css from "./ReviewBox.module.css";

const ReviewBox = ({ review }) => {
  return (
    <div className={css.container}>
      <p className={css.username}>{review.username}</p>
      <p className={css.comment}>{review.comment}</p>
      <p className={css.rating}>Rating: {review.rating}/5</p>
    </div>
  );
};

export default ReviewBox;
