const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ message: "error" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id: id })
    .then((account) => {
      if (account) {
        res.json(account);
      } else {
        res.status(404).json({ message: "Could not find account" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error" });
    });
});


router.post("/", (req, res) => {
 
      db('accounts').insert(req.body)
      .then(account => {
          res.status(201).json(account)
      })
      .catch(err => {
        res.status(500).json({ message: "error" });
      })
})

router.put("/:id",(req, res) => {
    const { id } = req.params
    db('accounts').where({id: id}).update(req.body)
    .then(account => {

        account === 1? (res.status(201).json(account)) : (res.status(404).json({message: 'account could not be updated'}))
    })
    .catch(err => {
        res.status(500).json({ message: "error" });
    })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    db('accounts').where({id: id}).delete()
    .then(account => {
        res.status(201).json({message: 'Account was deleted'})
    })
    .catch(err => {
        res.status(500).json({ message: "error" });
    })
})

module.exports = router;
