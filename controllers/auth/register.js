const { Conflict, InternalServerError } = require("http-errors");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw new Conflict("Email in use");

  const newUser = new User({ name, email });
  newUser.setPassword(password);

  const userData = await newUser.save();

  if (!userData) throw new InternalServerError("Server error");

  res.status(201).json({
    status: "User registered",
    code: 201,
    data: {
      user: {
        name: userData.name,
        email: userData.email,
        balance: userData.balance,
      },
    },
  });
};

module.exports = register;
