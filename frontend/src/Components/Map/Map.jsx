import React from "react";

const MapFrame = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.006031496027!2d98.67086607588162!3d3.586089350309485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131cf9d318f0b%3A0x24276c6d401c3eee!2sUniversitas%20Pelita%20Harapan%20Medan!5e0!3m2!1sen!2sid!4v1713485975469!5m2!1sen!2sid"
      width="800"
      height="600"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="UPH Medan Map"
    ></iframe>
  );
};

export default MapFrame;
