const express = require("express");
const UserController = require("../controllers/userController.js");

const router = express.Router();

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.put("/:id", UserController.editUser);
router.delete("/:id", UserController.deleteUser);
router.post("/", UserController.addUser);

module.exports = router;
