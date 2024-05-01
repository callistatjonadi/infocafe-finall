import React from "react";
import UserNavbar from "../../Navigation/UserNavbar";
import css from "./UserHome.module.css";
import MapFrame from "../../Components/Map/Map";

const UserHome = () => {
  return (
    <div className={css.container}>
      <UserNavbar />
      <div className={css.content}>
        <div className={css.leftContent}>
          <h2>Map</h2>
          <div className={css.mapContainer}>
            <MapFrame />
          </div>
        </div>
        <div className={css.rightContent}>
          <h2>Advertisement</h2>
          <div className={css.adsContainer}>
            <img src="/images/ads/ads_1.jpeg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
