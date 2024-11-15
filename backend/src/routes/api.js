const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Post } = require("../models/models");

router.get("/test", (req, res) => {
  res.json({ message: "Test Route is Working!" });
});

router.post("/register", async (req, res) => {
  try {
    const { username, usermail, userpass } = req.body;
    const hashedPassword = await bcrypt.hash(userpass, 10);
    const newUser = await User.create({
      username,
      usermail,
      userpass: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Ocorreu um Erro ao Cadastrar Usuário");
    res
      .status(500)
      .json({
        message: "Ocorreu um Erro ao Cadastrar Usuário",
        error: error.message,
      });
  }
});

module.exports = router;
