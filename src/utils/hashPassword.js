const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  if (password.length <= 8) {
    throw new Error("Password must be 8 characters long or longer");
  }

  return bcrypt.hash(password, 10);
};

module.exports = hashPassword;
