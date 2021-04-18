const bcrytp = require("bcrypt");
const MongoDB = require("../lib/db");

class LoginService {
  constructor() {
    this.db = new MongoDB();
    this.model = require("../lib/models/userModel");
  }

  async login(email, password) {
    //User exist?
    const user = await this.db
      .connect()
      .then(() => this.model.findOne({ email }));

    if (!user)
      return {
        error: "user y/o password incorrect",
      };
    //Validate password
    const validPassword = await bcrytp
      .compare(password, user.password)
      .then((result) => result);

    if (!validPassword)
      return {
        error: "user y/o password incorrect",
      };

    this.db.closeDB();
    return user;
  }
}

module.exports = LoginService;
