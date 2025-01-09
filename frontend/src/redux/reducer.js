import { GET_ALL_VIDEOS, DELETE_VIDEO } from "./actions";

const initialState = {
  videos: [],
  frontendVideos: [],
  backendVideos: [],
  showUpdateForm: null,
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_VIDEOS:
      const backendVideos = payload.filter(
        (video) => video.category === "Backend"
      );
      const frontendVideos = payload.filter(
        (video) => video.category === "Frontend"
      );
      return {
        ...state,
        backendVideos: backendVideos,
        frontendVideos: frontendVideos,
      };
    case DELETE_VIDEO:
      const updatedBackendVideos = state.backendVideos.filter(
        (video) => video._id !== payload
      );
      const updatedFrontendVideos = state.frontendVideos.filter(
        (video) => video._id !== payload
      );

      return {
        ...state,
        backendVideos: updatedBackendVideos,
        frontendVideos: updatedFrontendVideos,
      };
    default:
      return state;
  }
};

export default rootReducer;

