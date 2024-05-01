import React, { useEffect, useState } from "react";
import css from "./CafeList.module.css";
import axios from "axios";
import CafeCard from "../../Components/CafeCard/CafeCard";
import AdminNavbar from "../../Navigation/AdminNavbar";

const CafeList = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/cafes");
        setCafes(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <AdminNavbar />
      <h1 className={css.title}>Cafe List</h1>
      <div className={css.displayContainer}>
        {cafes.map((cafe) => (
          <CafeCard cafe={cafe} viewDetail={true}/>
        ))}
      </div>
    </div>
  );
};

export default CafeList;
