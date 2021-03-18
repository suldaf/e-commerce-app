module.exports = (err, req, res, next) => {
  let errorsMessage = [];
  let status;
  console.log(err, "<<<<<<<<<<<<<<<<<<<< ERROR HANDLING");
  switch (err.name) {
    case "SequelizeValidationError":
      err.errors.forEach((el) => {
        errorsMessage.push(el.message);
        status = 400;
      });
      break;
    case "SequelizeUniqueConstraintError":
      err.errors.forEach((el) => {
        errorsMessage.push(el.message);
        status = 400;
      });
      break;
    case "Login":
      errorsMessage = err.message;
      status = err.status;
      break;
    case "Auth":
      errorsMessage = err.message;
      status = err.status;
      break;
    case "Custom":
      errorsMessage = err.message;
      status = err.status;
      break;
    default:
      errorsMessage = "Internal server error";
      status = 500;
      break;
  }

  res.status(status || 500).json({ message: errorsMessage });
};
