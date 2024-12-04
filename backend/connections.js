const mongoose = require("mongoose");

const primaryConnection = mongoose.connection(
  "mongodb+srv://mbwakoko88:0SdoPDz7iZng5kIw@cluster0.vi4ar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const secondaryConnection = mongoose.connection();

module.exports = { primaryConnection, secondaryConnection };
