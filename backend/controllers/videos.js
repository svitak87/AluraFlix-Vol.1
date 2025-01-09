const { ObjectId } = require("mongodb");
const videosModel = require("../models/videos");

class videosController {
  constructor() {}

  async createVideo(req, res) {
    try {
      const video = await videosModel.create(req.body);
      res
        .status(201)
        .json({ message: "video succesfully created", data: video });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllVideos(req, res) {
    try {
      const videos = await videosModel.getAllVideos();
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateVideo(req, res) {
    const { id } = req.params;
    const { newTitle, newDescription, newEmbedUrl, newThumbnail, newCategory } = req.body;
  
    try {
      const videoFound = await videosModel.getOne(id);

      if (!videoFound) {
        return res.status(404).json({ error: "Video not found" });
      }
      const updateData = {};
  
      if (newTitle !== "") updateData.title = newTitle;
      if (newDescription !== "") updateData.description = newDescription;
      if (newEmbedUrl !== "") updateData.embedUrl = newEmbedUrl;
      if (newThumbnail !== "") updateData.thumbnail = newThumbnail;
      if (newCategory !== "") updateData.category = newCategory;
  
      const videoUpdated = await videosModel.update(id, updateData);
  
      if (videoUpdated.modifiedCount === 0) {
        return res.status(400).json({ error: "No changes were made to the video." });
      }
      res.status(200).json({ message: "Video updated successfully", data: videoUpdated });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  async updateVideo (req, res){
    try {
      const {id} = req.params;
      const data = await videosModel.update(id, req.body)
      res.status(200).json(data)
    } catch (error) {
      
    }
  }
  

  
  async deleteVideo(req, res) {
    const { id } = req.params;

    try {
      const data = await videosModel.delete(id);
      res.status(206).json({ message: "video has been deteletd", data: data });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOneVideo(req, res) {
    const { id } = req.params;

    try {
      const videoFound = await videosModel.getOne(id);
      res.status(200).json({ video: videoFound });
    } catch (error) {
      res.status(404).json({ error: "Video not found" });
    }
  }
}

module.exports = new videosController();
