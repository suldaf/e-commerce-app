const { User } = require("../models");
const { decoded } = require("../helpers/jwt");

const authenticate = (req, res, next) => {
  try {
    // console.log('MASUUKKK SININININININININ');
    const accessToken = req.headers.token;
    // console.log(accessToken);
    // const currentUser = jwt.verify(accessToken, process.env.SECRET)
    const currentUser = decoded(accessToken)
    // console.log(currentUser);
    User.findOne({ where: { email: currentUser.email } })
      .then((user) => {
        if (!user) {
          throw { message: "User not found", status: 404, name: "Auth" };
        }
        req.currentUser = currentUser;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    console.log(err);

    next({
      message: "Invalid token",
      status: 401,
      name: "Auth",
    });
  }
};

module.exports = { authenticate };
