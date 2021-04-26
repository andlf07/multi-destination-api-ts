const MongoDB = require("../lib/db");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.db = new MongoDB();
    this.userModel = require("../lib/models/userModel");
    this.tripModel = require('../lib/models/tripModel')
  }

  //Get all collection from DB
  async getAllUsers() {
    this.db.connect();
    const getCollection = await this.userModel.find().populate('trips');
    this.db.closeDB();

    return getCollection;
  }

  //get singleDcoument from collection = this.collection
  async singleUser(userId) {
    this.db.connect();
    const singleDocument = await this.userModel.findById(userId);
    this.db.closeDB();

    return singleDocument;
  }

  //Creating a user
  async createUser(data) {
    this.db.connect();

    //Encrypt password with bcrypt
    const saltRounds = 6;
    const hashPassword = await bcrypt
      .hash(data.password, saltRounds)
      .then((hash) => hash);
    data.password = hashPassword;

    const user = await new this.userModel(data);
    await user.save();
    this.db.closeDB();
    return user;
  }

  //Updating document
  async updateUser(userId, data) {
    this.db.connect();
    const updateDocument = await this.userModel.findByIdAndUpdate(userId, data, { new: true });
    this.db.closeDB();


    return updateDocument;
  }

  //Deleting one document
  async deleteUser(userId) {
    this.db.connect();
    const deleteDocument = await this.userModel.findByIdAndDelete(userId);
    //deleting trips of user already delete
    const deleteTrips = await this.tripModel.deleteMany({ user: userId })
    this.db.closeDB();

    return deleteDocument;
  }
}

module.exports = UserService;
