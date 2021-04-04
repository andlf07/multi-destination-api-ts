const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    this.dbConnect = this.connect();
    this.dbName = "tripApi-DB";
  }

  async connect() {
    if ( mongoose.connection.readyState == 0 ) {
      try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        });
        console.log("DB Online");
      } catch (error) {
        console.log(error);
        throw new Error("DB Error");
      }
    }
  }

  //CloseDB connection
  async closeDB() {
    return mongoose.connection.close().then((db) => console.log("DB close"));
  }
}

module.exports = MongoDB;
