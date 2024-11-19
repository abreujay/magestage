const { DataTypes, Sequelize} = require("sequelize");
const {sequelize} = require("../db/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  usermail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  userpass: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.userpass, 10);
  console.log("Senha criptografada no beforeCreate:", hashedPassword);
  user.userpass = hashedPassword;
});

User.beforeUpdate(async (user) => {
  if (user.changed("userpass")) {
    const hashedPassword = await bcrypt.hash(user.userpass, 10);
    user.userpass = hashedPassword;
  }
});

User.hasMany(Post);
Post.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    console.log("Banco de Dados Sincronizado");
  })

  .catch((error) => {
    console.error("Ocorreu um Erro ao Sincronizar o Banco de Dados", error);
  });

module.exports = {User, Post}