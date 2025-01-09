import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import "../banner/Banner.css";

const Banner = () => {
  const bannerVideo = useSelector((state) => state.frontendVideos[0]);

  return (
    <>
      <div className="banner-container">
        <img src="/static-images/banner-alura.jpg" className="banner-image" />
        {bannerVideo ? (
          <div className="video-player-wrapper-banner">
            <ReactPlayer
              url={bannerVideo.embedUrl}
              light={bannerVideo.thumbnail} 
              controls 
              width="100%" 
              height="100%" 
              className="react-player-banner"
            />
          </div>
        ) : (
          ""
        )}
        <div className="banner-text-content-container">
          <h2 className="banner-subtitle">Challenge React</h2>
          <p className="banner-message">
            Este challenge es una forma de apredizaje. Es un mecanismo donde
            podrás comprometerte en la resolución de un problema para poder
            aplicar todos los conocimientos en la formación de React.
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
