import express from "express";

import myDB from "../db/MyMongoDB.js";

const router = express.Router();

router.get("/getVisitors", async (req, res) => {
  try {
    const result = await myDB.fetchVisitors();
    res.status(200).json({ result });
  } catch (err) {
    console.error("# Get Error", err);
    res.status(500).send({ error: err.name + ", " + err.message });
  }
});

router.post("/login", async (req, res) => {
  const user = req.body;

  //Check that we got the correct info using databse
  if (await myDB.authenticate(user)) {
    req.session.user = user.user;

    //res.redirect("/?msg=authenticated");
    res.redirect("/system.html");
  } else {
    req.session.user = null;
    res.redirect("/?msg=error authenticating");
  }
});

// Add visitor
router.post("/addVisitors", async (req, res) => {
  const visitor = req.body;

  try {
    visitor = await myDB.addVisitor(visitor);
    res.json(visitor);
  } catch (err) {
    console.error("# Post Error", err);
    res.status(500).send({ error: err.name + ", " + err.message });
  }
});

// delete visitor
router.delete("/deleteVisitor/:id", async (req, res) => {
  const id = req.params.id;
  let respObj = {};

  console.log("API ID:", id);

  if (id && ObjectId.isValid(id)) {
    try {
      respObj = await myDB.deleteVisitor(id);
    } catch (err) {
      console.error("# Delete Error", err);
      res.status(500).send({ error: err.name + ", " + err.message });
      return;
    }
  } else {
    respObj = { message: "Data not deleted; the id to delete is not valid!" };
  }

  res.json(respObj);
});

export default router;
