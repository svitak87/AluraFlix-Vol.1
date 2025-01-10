const { ObjectId } = require("mongodb");
const dbClient = require("../config/dbclient.js");

class videosModel {
  constructor() {
    this.collection = null; 
  }

  async init() {
    const db = dbClient.getDb; 
    this.collection = db.collection("videos");
  }

  async create(dataVideo) {
    try {
      if (!this.collection) await this.init(); 
      const newVideo = await this.collection.insertOne(dataVideo);
      return newVideo;
    } catch (error) {
      console.error("Error creating video:", error.message);
      throw error;
    }
  }

  async getAllVideos() {
    try {
      if (!this.collection) await this.init(); 
      const allVideos = await this.collection.find().toArray();
      return allVideos;
    } catch (error) {
      console.error("Error fetching all videos:", error.message);
      throw error;
    }
  }

  async update(id, dataVideo) {
    try {
      if (!this.collection) await this.init(); 
      const updateData = {};

      for (let key in dataVideo) {
        if (dataVideo[key] !== "") {
          updateData[key] = dataVideo[key];
        }
      }

      if (Object.keys(updateData).length === 0) {
        return { modifiedCount: 0 };
      }

      const videoUpdated = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      return videoUpdated;
    } catch (error) {
      console.error("Error updating video:", error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      if (!this.collection) await this.init(); 
      return await this.collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error deleting video:", error.message);
      throw error;
    }
  }

  async getOne(id) {
    try {
      if (!this.collection) await this.init(); 
      const videoFound = await this.collection.findOne({
        _id: new ObjectId(id),
      });
      return videoFound;
    } catch (error) {
      console.error("Error fetching video:", error.message);
      throw error;
    }
  }
}

module.exports = new videosModel();
