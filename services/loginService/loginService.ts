import { userInterface } from '../userService/interface';
import { MongoDB } from '../../lib/db'

export class LoginService {
  public db;
  public model;
  public constructor() {
    this.db = new MongoDB();
    this.model = require("../../lib/models/userModel");
  }

  async login(email: string): Promise<userInterface> {
    const user = await this.db
      .connect()
      .then(() => this.model.findOne({ email }));
    this.db.closeDB();
    return user;
  }
}
