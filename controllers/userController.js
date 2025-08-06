const userModel = require("../models/userModel.js");

class UserController {
  async getUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting the users:", error);
      res
        .status(500)
        .json({ message: "Something went wrong.... Internal server error" });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.getSingleUser(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting the user:", error);
      res
        .status(500)
        .json({ message: "Something went wrong.... Internal server error" });
    }
  }

  async addUser(req, res) {
    try {
      const { full_name, email, phone } = req.body;

      if (!full_name || !email || !phone) {
        return res
          .status(400)
          .json({ message: "full_name, email and phone are required" });
      }

      const newUser = await userModel.createUser(full_name, email, phone);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "Something went wrong.... Internal server error" });
    }
  }

  async editUser(req, res) {
    try {
      const { id } = req.params;
      const { full_name, email, phone } = req.body;

      const updatedUser = await userModel.updateUser(
        id,
        full_name,
        email,
        phone
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res
        .status(500)
        .json({ message: "Something went wrong.... Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await userModel.deleteUserByID(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();
