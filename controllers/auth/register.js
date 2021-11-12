const { BadRequest, Conflict } = require("http-errors");
const { joiSchema } = require("../../models/user");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const userName = await User.findOne({ name });
    if (userName) {
      throw new Conflict("This name is already in use");
    }

    const verificationToken = nanoid();

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({
      email,
      password: hashPassword,
      name,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Підтвердження реєстрації на сайті",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Натисніть для підтвердження email</a>`,
    };

    sendEmail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Register success",
      user: {
        email,
        name,
        verificationToken,
        subscription: subscr,
        _id,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
