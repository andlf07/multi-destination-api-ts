const MongoDB = require("../lib/db");

class CrudService {
  constructor(collection) {
    this.db = new MongoDB();
    this.model = collection;
  }

  //Get all collection from DB
  async getCollection() {
    const getCollection = await this.db.connect().then(() => this.model.find());
    this.db.closeDB();
    return getCollection;
  }

  //get singleDcoumento from collection = this.collection
  async singleDocument(docId) {
    const singleDocument = await this.db
      .connect()
      .then(() => this.model.findById(docId));
    this.db.closeDB();
    return singleDocument;
  }

  //Creating a document and inseting in collection
  async createDocument(data) {
    const createDocument = await this.db
      .connect()
      .then(() => new this.model(data).save());
    this.db.closeDB();
    return createDocument;
  }

  //Updating document
  async updateDocument(docId, data) {
    const updateDocument = await this.db
      .connect()
      .then(() => this.model.findByIdAndUpdate(docId, data, { new: true }));
    this.db.closeDB();
    return updateDocument;
  }

  //Deleting one document
  async deleteDocument(docId) {
    const deleteDocument = await this.db
      .connect()
      .then(() => this.model.findByIdAndDelete(docId))
      .then((result) => result);
    this.db.closeDB();
    return deleteDocument;
  }

  async createSubDoc( docId, subDoc ) {
    this.db.connect();
    const getDocument = await this.model.findById(docId).then((result) => {

      result.trips.push(subDoc);
      result.save();
      return result
    })
    this.db.closeDB;

    return getDocument
  }

  async getSingleSubDoc( docId, subDocId ) {
    this.db.connect();
    console.log( docId, subDocId)
    const getSingleDoc = await this.model.findById( docId ).then(result => result.trips.id( subDocId ));
    this.closeDB;
    return getSingleDoc;

  }
}

module.exports = CrudService;
