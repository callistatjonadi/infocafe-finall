import React, { useEffect, useState } from "react";
import css from "./UserCafeList.module.css";
import axios from "axios";
import CafeCard from "../../Components/CafeCard/CafeCard";
import UserNavbar from "../../Navigation/UserNavbar";

const UserCafeList = () => {
  const [cafes, setCafes] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCafes = cafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.distance - b.distance);

  return (
    <div>
      <UserNavbar />
      <div className={css.header}>
        <h1 className={css.title}>Cafe List</h1>
        <input
          className={css.searchBar}
          type="text"
          placeholder="Search cafes..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className={css.displayContainer}>
        {filteredCafes.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} viewDetail={true}/>
        ))}
      </div>
    </div>
  );
};

export default UserCafeList;


