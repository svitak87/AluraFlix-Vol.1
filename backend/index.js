const dbClient = require("./config/dbclient.js");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/videos.js");

const server = express();
const PORT = process.env.PORT || 3008;

// Middleware
server.use(morgan("dev"));
server.use(cors({
  origin: "https://aluraflixchallenge.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Rutas
server.use("/api", router);

// Configuración para conectar a la base de datos
const main = async () => {
  try {
    await dbClient.dbConnection();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  }
};
main();

// Exportamos el servidor para que Vercel lo utilice
module.exports = server;
