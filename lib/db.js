const { MongoClient, ObjectId } = require("mongodb");

class MongoDB {
  constructor() {
    this.dbConnect = new MongoClient(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
    });
    this.dbName = "tripApi-DB";
  }

  connect() {
    if (!MongoDB.connection) {
      MongoDB.connection = new Promise((resolve, reject) => {
        this.dbConnect.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log("Connect succesfully to atlas");
          resolve(this.dbConnect.db(this.dbName));
        });
      });
    }
    return MongoDB.connection;
  }

  //GetAll Trip Collection
  getAll(collection, query) {
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
      db.collection(collection).deleteOne({ _id: ObjectId(id) })
      .then(() => id)
    );
  }
}

module.exports = MongoDB;
