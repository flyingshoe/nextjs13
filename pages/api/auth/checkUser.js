let users = require("/data/users.json");

export default async (req, res) => {
  console.log(req);
  if (req.method === "POST") {
    const { username, password } = req.body.data;
    res.status(200).json({ success: users[username] === password });
  }
};
