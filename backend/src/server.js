const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {authenticate} = require("./db/database");

const apiRoutes = require("./routes/api");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(cors());

authenticate().then(() => {
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Servidor Rodando na Porta ${PORT}`);
  });
});
