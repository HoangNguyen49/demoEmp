var express = require("express");
var router = express.Router();
const EmpModel = require("../models/emp.model");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const emps = await EmpModel.find({});
    return res.render("emp/index", { emps });
  } catch (err) {
    return res.render("error", { message: err.message });
  }
});

router.get("/v1", async (req, res) => {
  try {
    const emps = await EmpModel.find({ });
    return res.statusCode(200).json(emps);
  } catch (err) {
    return res.sendStatus(500).json({ message: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    // const keyword = req.query.keyword;
    const emps = await EmpModel.find({ $and: [{role: "user"}, {name: keyword}] });
    return res.render("emp/index", { emps });
  } catch (err) {
    return res.render("error", { message: err.message });
  }
});

router.get("/create", (req, res) => {
  return res.render("emp/create");
});

router.post("/create", async (req, res) => {
  try {
    const emp = new EmpModel(req.body);
    await emp.save();
    return res.redirect("/emp");
  } catch (err) {
    return res.render("error", { message: err.message });
  }
});

router.get("/login", (req, res) => {
  return res.render("emp/login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const emp = await EmpModel.findOne({ email, pwd });
    if (emp) {
      if (emp.role === "admin") {
        return res.redirect("/emp");
      } else {
        return res.render("emp/details", { emp });
      }
    } else {
      return res.render("emp/login", { message: "Invalid email or password" });
    }
  } catch (err) {
    return res.render("error", { message: err.message });
  }
});

module.exports = router;
