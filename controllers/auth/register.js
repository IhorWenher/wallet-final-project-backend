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

  let newUserData = await User.findOne({ email });

  const payload = { id: newUserData._id };
  const token = jwt.sign(payload, SECRET_KEY);

  newUserData = await User.findByIdAndUpdate(
    newUserData._id,
    { token },
    { new: true }
  );

  if (!newUserData) throw new InternalServerError("Server error");

  res.status(201).json({
    status: "User registered",
    code: 201,
    data: {
      token,
      user: {
        name: newUserData.name,
        email: newUserData.email,
        balance: newUserData.balance,
      },
    },
  });
};

module.exports = register;
