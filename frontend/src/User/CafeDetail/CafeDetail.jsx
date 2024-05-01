import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../../Navigation/UserNavbar";
import css from "./CafeDetail.module.css";
import CafeCard from "../../Components/CafeCard/CafeCard";
import ReviewBox from "../../Components/ReviewBox/ReviewBox";

function CafeDetail() {
  const { cafeId } = useParams();
  const [cafe, setCafe] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCafeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/cafes/${cafeId}`);
        setCafe(response.data);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Failed to fetch cafe data", error);
      }
    };

    fetchCafeData();
  }, [cafeId]);

  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    const username = localStorage.getItem("username");
    const payload = {
      ...formData,
      user_id: userId,
    };

    try {
      const response = await axios.post(`http://localhost:8081/api/reviews/${cafeId}`, payload);
      console.log("Review added:", response.data);
      response.data.username = username;
      setReviews([...reviews, response.data]);
      setFormData({ comment: "", rating: 0 });
    } catch (error) {
      console.error("Failed to add review", error);
    }
  };

  if (!cafe) return <div>Loading...</div>;
  console.log(reviews);

  return (
    <div className={css.container}>
      <UserNavbar />
      <div className={css.content}>
        <div className={css.leftContent}>
          <CafeCard cafe={cafe} viewDetail={false} />
        </div>
        <div className={css.rightContent}>
          <h2 className={css.reviewTitle}>Review List</h2>
          <div className={css.scrollPanel}>
            {reviews.map((review) => (
              <ReviewBox review={review} key={review._id} />
            ))}
          </div>
          <div className={css.formContainer}>
            <form onSubmit={handleSubmit} className={css.form}>
              <div className={css.input}>
                <input className={css.textInput} type="text" placeholder="Add New Review" name="comment" value={formData.comment} onChange={handleInputChange} />
                <input className={css.textInput} type="number" placeholder="Rating" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="5" step="1" />
              </div>
              <div className={css.btnContainer}>
                <button type="submit" className={css.addBtn}>
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafeDetail;
