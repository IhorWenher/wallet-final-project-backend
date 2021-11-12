const getCurrent = async (req, res) => {
  const { user } = req;

  const { email, name } = user;

  res.json({
    status: "success",
    user: {
      email,
      name,
    },
  });
};

module.exports = getCurrent;
