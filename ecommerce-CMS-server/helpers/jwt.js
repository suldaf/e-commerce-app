const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET);
}
function decoded(access) {
  const currentUser = jwt.verify(access, process.env.SECRET);
  return currentUser;
}
module.exports = { generateToken, decoded };
