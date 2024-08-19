const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const jwtsecret =
  process.env.JWT_SECRET || "sdfghjewtrwyehdfjrasytahsjdwyqwidaxhjksx";

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const bcryptSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    const userDoc = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
          },
          jwtsecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("Password not okay");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "").json(true);
};
