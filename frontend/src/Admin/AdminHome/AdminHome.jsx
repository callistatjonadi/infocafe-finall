import React, { useState, useEffect } from "react";
import css from "./AdminHome.module.css";
import MapFrame from "../../Components/Map/Map";
import AdminNavbar from "../../Navigation/AdminNavbar";

const AdminHome = () => {

  const carouselImages = [
    "/images/cafes/cafe1.jpg",
    "/images/cafes/cafe2.jpg",
    "/images/cafes/cafe3.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(goToNextImage, 2000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={css.container}>
      <AdminNavbar />
      <div className={css.carousel}>
        <img
          className={css.carouselImage}
          src={carouselImages[currentImageIndex]}
          alt={`Carousel Image ${currentImageIndex + 1}`}
        />
        <button className={css.prevButton} onClick={goToPrevImage}>
          Prev
        </button>
        <button className={css.nextButton} onClick={goToNextImage}>
          Next
        </button>
      </div>
      <div className={css.content}>
        <div className={css.leftContent}>
          <h2>Map</h2>
          <div className={css.mapContainer}>
            <MapFrame />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
