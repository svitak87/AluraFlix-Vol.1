require("dotenv").config();
const { MongoClient } = require("mongodb");

class dbClient {
  constructor() {
    const queryConection = process.env.QUERY_CONECTION;
    this.client = new MongoClient(queryConection, {
      serverSelectionTimeoutMS: 5000,
    });
    
    this.db = null;
  }

  // Método público para establecer la conexión
  async dbConnection() {
    try {
      await this.client.connect();
      this.db = await this.client.db("videos_alura_flix");
      console.log("Connected to the data base server");
    } catch (error) {
      console.log("Failed to connect to database:", error);
      throw error;
    }
  }

  // Getter para acceder a la base de datos
  get getDb() {
    if (!this.db) {
      throw new Error("Database connection is not established yet.");
    }
    return this.db;
  }

  // Método para cerrar la conexión
  async closeConnection() {
    try {
      if (this.client) {
        await this.client.close();
        console.log("MongoDB connection closed.");
      }
    } catch (error) {
      console.error("Error closing MongoDB connection:", error.message);
    }
  }
}

module.exports = new dbClient();
