const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "magestage",
  process.env.DBUSER,
  process.env.USERPASS,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o Banco de Dados Bem Sucedida.");
  } catch (error) {
    console.error("Ocorreu um Erro ao Conectar-se com o Banco de Dados", error);
  }
}

module.exports = { authenticate, sequelize };
