const jwt = require("jsonwebtoken");
const jwtsecret =
  process.env.JWT_SECRET || "sdfghjewtrwyehdfjrasytahsjdwyqwidaxhjksx";

exports.getProfile = (req, res) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, jwtsecret, {}, (err, user) => {
      if (err) {
        console.error(err);
        res.status(401).json({ error: "Invalid token" });
      } else {
        res.json(user);
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
