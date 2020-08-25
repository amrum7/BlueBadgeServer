require("dotenv").config();
let express = require("express");
let app = express();
const sequelize = require("./db");
let budget = require("./controllers/budgetcontroller");
let user = require("./controllers/usercontroller");

sequelize.sync();
app.use(express.json());

app.use(require("./middleware/headers"));

app.use("/user", user);

app.use("/budget", budget);

app.listen(3000, function () {
  console.log("App is listening");
});
