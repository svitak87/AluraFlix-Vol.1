import React from "react";
import { useNavigate } from "react-router-dom";
import "./PopUpSuccess.css";

const PopUpSuccess = ({ setShowPopUp }) => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    setShowPopUp(false);
    navigate("/")
  };

  return (
    <div className="pop-up-overlay">
      <div className="pop-container">
        <h2>Video creado con éxito</h2>
        <button onClick={handleClose}>Ok!</button>
      </div>
    </div>
  );
};

export default PopUpSuccess;
