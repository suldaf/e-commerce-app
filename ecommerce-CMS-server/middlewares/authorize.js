const { User } = require("../models");
const authorize = (req, res, next) => {
  const userId = req.currentUser.id;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        throw { message: "Task not found", status: 404, name: "Auth" };
      }
      if (user.role === "admin") {
        next();
      } else {
        throw { message: "Not authorized", status: 401, name: "Auth" };
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { authorize };
