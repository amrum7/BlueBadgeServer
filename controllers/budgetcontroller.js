let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Budget = require("../db").import("../models/budget");

router.get("/practice", validateSession, function (req, res) {
  res.send("Practice GET Successful");
});

router.post("/post", validateSession, (req, res) => {
  const budgetEntry = {
    type: req.body.budget.type,
    category: req.body.budget.category,
    amount: req.body.budget.amount,
    date: req.body.budget.date,
  };
  Budget.create(budgetEntry)
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/budget", (req, res) => {
  Budget.findAll()
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/budget/:id", validateSession, (req, res) => {
  let userid = req.user.id;
  Budget.findAll({
    where: { owner: userid },
  })
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/budget/:id", validateSession, function (req, res) {
  const updateBudgetEntry = {
    type: req.body.budget.type,
    category: req.body.budget.category,
    amount: req.body.budget.amount,
    date: req.body.budget.date,
  };

  const query = { where: { id: req.params.id, owner: req.user.id } };

  Budget.update(updateBudgetEntry, query)
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/log/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Budget.destroy(query)
    .then(() => res.status(200).json({ message: "Budget Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
