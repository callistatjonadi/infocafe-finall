import React, { useState } from "react";
import css from "./AddCafe.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Navigation/AdminNavbar";

const AddCafe = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    image: null,
    distance: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddCafe = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("distance", formData.distance);

    axios
      .post("http://localhost:8081/api/cafes/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Cafe added successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding cafe:", error);
      });
  };
  return (
    <div className={css.container}>
      <AdminNavbar />
      <div className={css.content}>
        <div className={css.leftContent}>
          <img src="/images/cafes/cafe_1.jpeg" alt="" />
        </div>
        <div className={css.rightContent}>
          <form onSubmit={handleAddCafe} className={`${css.card}`}>
            <h1 className={css.title}>Add Cafe</h1>
            <input className={css.textInput} type="text" placeholder="Cafe Name" name="name" onChange={handleInputChange} />
            <input className={css.textInput} type="text" placeholder="Cafe Description" name="description" onChange={handleInputChange} />
            <input className={css.textInput} type="text" placeholder="Cafe Address" name="address" onChange={handleInputChange} />
            <input className={css.textInput} type="number" placeholder="Cafe Distance" name="distance" onChange={handleInputChange} />
            <input className={css.fileInput} type="file" name="image" onChange={handleInputChange} accept="image/*" />
            <button type="submit" className={css.addBtn}>
              Add Cafe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCafe;
