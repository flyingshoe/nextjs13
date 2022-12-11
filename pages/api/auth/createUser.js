const fs = require("fs");
let users = require("/data/users.json");

export default async (req, res) => {
  console.log(req);
  if (req.method === "PUT") {
    const { username, password } = req.body.data;
    users[username] = password;

    saveData();
    res.status(200).json({ success: true });
  }
};

function saveData() {
  fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4));
}
