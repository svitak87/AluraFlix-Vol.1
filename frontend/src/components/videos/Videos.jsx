import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllvideos, deleteVideo } from "../../redux/actions";
import Video from "../video/Video";
import "../videos/Videos.css";

const Videos = () => {
  const backendVideos = useSelector((state) => state.backendVideos);
  const frontendVideos = useSelector((state) => state.frontendVideos);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllvideos());
  }, [dispatch, refresh]);

  const handleDeleteVideo = async (id) => {
    try {
      await dispatch(deleteVideo(id));
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="videos-container">
      <div
        className="stack-title-section-container"
        style={{ backgroundColor: "#71ff89" }}
      >
        <h2 className="stack-title">Backend</h2>
      </div>
      <div className="stack-videos-container">
        {backendVideos.length > 0 ? (
          backendVideos.map((video) => (
            <Video
              key={video._id}
              {...video}
              onDelete={() => handleDeleteVideo(video._id)}
              setRefresh={setRefresh}
            />
          ))
        ) : (
          <p>No hay backend videos</p>
        )}
      </div>
      <div
        className="stack-title-section-container"
        style={{ backgroundColor: "#62c5ff" }}
      >
        <h2 className="stack-title">Frontend</h2>
      </div>
      <div className="stack-videos-container">
        {frontendVideos.length > 0 ? (
          frontendVideos.map((video) => (
            <Video
              key={video._id}
              {...video}
              onDelete={() => handleDeleteVideo(video._id)}
              setRefresh={setRefresh}
            />
          ))
        ) : (
          <p>No hay frontend videos</p>
        )}
      </div>
    </div>
  );
};

export default Videos;
