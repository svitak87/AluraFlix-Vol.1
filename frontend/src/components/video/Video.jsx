import React, { useState } from "react";
import ReactPlayer from "react-player";
import { MdDeleteForever, MdFullscreen } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "../video/Video.css";
import EditForm from "../editForm/EditForm";

const Video = ({
  _id,
  title,
  description,
  embedUrl,
  thumbnail,
  category,
  onDelete,
  setRefresh,
}) => {
  const [showForm, setShowEditForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); 

  const showEditForm = () => {
    setShowEditForm((prevState) => !prevState);
  };

  const handleVideoBorder = () => {
    let borderStyle;
    if (category === "Backend") {
      borderStyle = "3px solid #71ff89";
    } else if (category === "Frontend") {
      borderStyle = "3px solid #62c5ff";
    }
    return borderStyle || "none";
  };

  const toggleVideoSize = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="video-container" style={{ position: "relative" }}>
      {isExpanded && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 999,
          }}
        >
          <IoMdCloseCircleOutline
            className="close-expanded-video-icon"
            onClick={toggleVideoSize}
          />
        </div>
      )}
      <div
        className={`video-player-wrapper ${isExpanded ? "expanded" : ""}`}
        onClick={toggleVideoSize}
        style={{
          width: isExpanded ? "90vw" : "100%",
          height: isExpanded ? "90vh" : "300px",
          position: isExpanded ? "fixed" : "relative",
          top: isExpanded ? "50%" : "0",
          left: isExpanded ? "50%" : "0",
          transform: isExpanded ? "translate(-50%, -50%)" : "none",
          zIndex: isExpanded ? 1000 : 1,
          backgroundColor: isExpanded ? "#000" : "transparent",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <ReactPlayer
          url={embedUrl}
          light={thumbnail}
          controls
          width="100%"
          height="100%"
          className="react-player"
        />
      </div>
      <div className="title-description-container">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
      <MdFullscreen onClick={toggleVideoSize} className="big-screen-icon"/>
      </div>
      <div className="icons-container" style={{ border: handleVideoBorder() }}>
        <MdDeleteForever onClick={onDelete} className="icon" />
        <h5 className="text-icon">BORRAR</h5>
        <FaPen onClick={showEditForm} className="icon" />
        <h5 className="text-icon">EDITAR</h5>
      </div>
      {showForm && (
        <EditForm
          setShowEditForm={setShowEditForm}
          id={_id}
          setRefresh={setRefresh}
          title={title}
          description={description}
          embedUrl={embedUrl}
          thumbnail={thumbnail}
        />
      )}
    </div>
  );
};

export default Video;
