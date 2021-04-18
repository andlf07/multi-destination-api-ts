const { response } = require("express");

const validateUserType = (req, res = response, next) => {
  const { userType } = req;

  if (userType == "USER") {
    return res.status(401).json({
      msg: "Unauthorized, dont have permission",
    });
  }

  if(userType == 'ADMIN') next();

};

module.exports = validateUserType;
