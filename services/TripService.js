const MongoDB = require("../lib/db");

class CrudService {
  constructor( collection ) {
    this.db = new MongoDB();
    this.model = collection;
  }

  //Getting all trips from <trip> collection
  async getCollection() {
    // const allTrips = await this.db.getAll().then((result) => result);
    const getCollection = await this.db.connect().then(() => this.model.find())
    this.db.closeDB();
    return getCollection;
  }

  //Creating a <trip> and inseting in collection
  async createDocument(data) {
    const createDocument = await this.db.connect().then(() => new this.model(data).save());
    this.db.closeDB()
    return createDocument;
  }

  //Updating a <trip>
  async updateDocument({ docId, data }) {
    // const updateTripId = await this.db.update(this.collection, tripId, trip);
    const updateDocument = await this.db.connect().then(() => this.model.findByIdAndUpdate( docId, data ));
    this.db.closeDB();
    return updateDocument;
  }

  //get single trip by id

  async singleDocument({ docId }) {
    const singleDocument = await this.db.connect().then(() => this.model.findById( docId )).then( result  => result );
    this.db.closeDB();
    return singleDocument;
  }

  //Deleting one <trip>
  async deleteDocument({ docId }) {
    const deleteDocument = await this.db.connect().then(() => this.model.findByIdAndDelete( docId ).then(result => result.id));
    this.db.closeDB();
    return deleteDocument;
  }
}

module.exports = CrudService;
