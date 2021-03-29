const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

class MongoDB {
  constructor() {
    this.dbConnect = this.connect();
    this.dbName = "tripApi-DB";
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      console.log('DB Online');
    } catch (error) {
      console.log(error);
      throw new Error('DB Error');
    }
  }

  //GetAll Trip Collection
  getAll(collection) {
    return this.connect().then((db) =>
      db.collection(collection).find(query).toArray()
    );
  }

  //Create Inserting to DB
  create(collection, data) {
    return this.connect()
      .then((db) => db.collection(collection).insertOne(data))
      .then((result) => result.ops);
  }

  //Update Trip
  update(collection, id, data) {
    return this.connect()
      .then((db) =>
        db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: false })
      )
      .then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect().then((db) =>
      db
        .collection(collection)
        .deleteOne({ _id: ObjectId(id) })
        .then(() => id)
    );
  }
}

module.exports = MongoDB;
