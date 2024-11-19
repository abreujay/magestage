const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Post } = require("../models/models");

async function bcryptTest(){

  const senha = '1234'
  const senhaCriptografada = await bcrypt.hash(senha, 10)

  const match = await bcrypt.compare(senha, senhaCriptografada)
  
  if(!match) {

    console.log('Senhas não coincidem')

  } else {

    console.log('Senha recebida:', senha)
    console.log('Senha criptografada:', senhaCriptografada)
    console.log('As senhas coincidem')

  }

}

bcryptTest()

router.get("/test", (req, res) => {
  res.json({ message: "Test Route is Working!" });
});

router.post("/register", async (req, res) => {
  try {
    const { username, usermail, userpass } = req.body;
    const newUser = await User.create({
      username,
      usermail,
      userpass,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Ocorreu um Erro ao Cadastrar Usuário");
    res.status(500).json({
      message: "Ocorreu um Erro ao Cadastrar Usuário",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, userpass } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: "Usuário Não Encontrado..." });
    }
    
    console.log("Senha recebida para login:", userpass);
    console.log("Hash armazenado do usuário:", user.userpass);

    const passwordIsCorrect = await bcrypt.compare(userpass, user.userpass);

    if (!passwordIsCorrect) {
      return res.status(400).json({ message: "Senha Incorreta..." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({
      message: "Ocorreu Um Erro de Autenticação...",
      error: error.message,
    });
    console.error("Erro de auth:", error);
  }
});


module.exports = router;
