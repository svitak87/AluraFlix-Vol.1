export const GET_ALL_VIDEOS = "GET_ALL_VIDEOS";
export const SHOW_UPDATE_FORM = "SHOW_UPDATE_FORM";
export const DELETE_VIDEO = "DELETE_VIDEO";
export const UPDATE_VIDEO = "UPDATE_VIDEO";
export const CREATE_VIDEO = "CREATE_VIDEO"

import axios from "axios";

export const getAllvideos = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://aluraflix-backend.vercel.app/api/videos");

      dispatch({ type: GET_ALL_VIDEOS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteVideo = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://aluraflix-backend.vercel.app/api/${id}`);

      dispatch({ type: DELETE_VIDEO, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateVideo = (id, dataVideo) => {
  return async (dispatch) => {
    try {
      await axios.put(`https://aluraflix-backend.vercel.app/api/${id}`, dataVideo);

      dispatch({ type: UPDATE_VIDEO });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createVideo = (dataVideo) =>{
  return async (dispatch) => {
    try {
      await axios.post(`https://aluraflix-backend.vercel.app/api/create`, dataVideo);

      dispatch({type: CREATE_VIDEO})
    } catch (error) {
      console.log(error)
    }
  }
}

