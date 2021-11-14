const { Conflict } = require("http-errors");

const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Already registered");
  }

  const newUser = new User({ email, name });
  newUser.setPassword(password);

  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
  });
};

module.exports = register;
