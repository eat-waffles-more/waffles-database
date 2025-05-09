const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { readUsers, writeUsers } = require("../utils/fileStore");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).send("Missing fields");

  const users = readUsers();
  if (users.find(u => u.email === email))
    return res.status(409).send("Email already in use");

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    username,
    email,
    passwordHash,
    bio: "",
    avatarUrl: "",
    joined: new Date().toISOString(),
    projects: []
  };

  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ id: newUser.id, username: newUser.username });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).send("Invalid credentials");

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).send("Invalid credentials");

  res.json({ id: user.id, username: user.username });
});

// Public profile
router.get("/:id", (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).send("User not found");

  const { username, bio, avatarUrl, joined } = user;
  res.json({ username, bio, avatarUrl, joined });
});

module.exports = router;
