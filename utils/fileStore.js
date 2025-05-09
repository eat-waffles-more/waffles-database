const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "../data/users.json");

function readUsers() {
  if (!fs.existsSync(file)) return [];
  const data = fs.readFileSync(file, "utf8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

module.exports = { readUsers, writeUsers };
