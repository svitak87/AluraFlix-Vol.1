const express = require("express")
const route = express.Router()
const  videosController = require("../controllers/videos")

route.post("/create", videosController.createVideo)
route.get("/videos", videosController.getAllVideos)
route.get("/findone/:id", videosController.getOneVideo)
route.put("/:id", videosController.updateVideo)
route.delete("/:id", videosController.deleteVideo)


module.exports = route