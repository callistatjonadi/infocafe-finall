import React from "react";
import css from "./AdminHome.module.css";
import MapFrame from "../../Components/Map/Map";
import AdminNavbar from "../../Navigation/AdminNavbar";

const AdminHome = () => {
  return (
    <div className={css.container}>
      <AdminNavbar />
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

export default AdminHome;
