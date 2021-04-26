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

    this.db.closeDB();
    return user;
  }
}

module.exports = LoginService;
