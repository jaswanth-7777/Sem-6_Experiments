const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { users } = require("../models/userModel");

const tokenBlacklist = new Set();

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "invalid credentials" });

  const payload = { userId: user.id, username: user.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
  });

  return res.json({ token });
};

exports.logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json({ message: "authorization header missing" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(400).json({ message: "token missing" });

  tokenBlacklist.add(token);
  return res.json({ message: "successfully logged out" });
};

exports.protected = (req, res) => {
  return res.json({ message: "You accessed a protected endpoint", user: req.user });
};

exports.isTokenBlacklisted = (token) => tokenBlacklist.has(token);
