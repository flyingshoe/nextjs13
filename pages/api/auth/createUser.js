const fs = require("fs");
let users = require("/data/users.json");

export default async (req, res) => {
  if (req.method === "PUT") {
    const { username, password } = req.body.data;

    // User already exists
    if (username in users) {
      res.status(200).json({ success: false, msg: "User already exists" });
    }
    // New user, add to users object and save to DB
    else {
      users[username] = password;
      saveData();
      res.status(200).json({ success: true });
    }
  }
};

function saveData() {
  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 2));
}
