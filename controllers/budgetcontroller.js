let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const Budget = require("../db").import("../models/budget");

router.post("/post", validateSession, (req, res) => {
  const budgetEntry = {
    type: req.body.budget.type,
    category: req.body.budget.category,
    amount: req.body.budget.amount,
    date: req.body.budget.date,
    owner: req.user.id,
  };
  Budget.create(budgetEntry)
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/budget", validateSession, (req, res) => {
  let userid = req.user.id;
  Budget.findAll({
    where: { owner: userid },
  })
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/budget/:id", validateSession, (req, res) => {
  const userid = req.user.id;
  Budget.findAll({
    where: { owner: userid },
  })
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/budget/:id", validateSession, (req, res) => {
  const updateBudgetEntry = {
    type: req.body.budget.type,
    category: req.body.budget.category,
    amount: req.body.budget.amount,
    date: req.body.budget.date,
    owner: req.user.id,
  };

  const query = { where: { id: req.params.id, owner: req.user.id } };

  Budget.update(updateBudgetEntry, query)
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/budget/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Budget.destroy(query)
    .then(() => res.status(200).json({ message: "Budget Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

// Test comment

module.exports = router;
