const bcrypt = require("bcryptjs");

function hash(pass) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pass, salt);
}

function compare(pass, passDB) {
  return bcrypt.compareSync(pass, passDB);
}

module.exports = {
  hash,
  compare,
};
