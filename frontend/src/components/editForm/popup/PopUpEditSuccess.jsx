import React from "react";
import { useNavigate } from "react-router-dom";
import "./PopUpEditSuccess.css";

const PopUpEditSuccess = ({ setShowPopUp, setShowEditForm }) => {
//   const navigate = useNavigate();
  
  const handleClose = () => {
    setShowEditForm(false)
    setShowPopUp(false);
  };

  return (
    <div className="pop-up-overlay">
      <div className="pop-container">
        <h2>Video actualizado con éxito</h2>
        <button onClick={handleClose}>Ok!</button>
      </div>
    </div>
  );
};

export default PopUpEditSuccess;

