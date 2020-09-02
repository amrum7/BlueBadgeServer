const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
  });

module.exports = sequelize;
