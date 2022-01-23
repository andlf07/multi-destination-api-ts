"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongoose = require("mongoose");
class MongoDB {
    constructor() {
        this.dbConnect = this.connect();
        this.dbName = "tripApi-DB";
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose.connection.readyState == 0) {
                try {
                    yield mongoose.connect(process.env.MONGODB_ATLAS, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex: true,
                        useFindAndModify: false,
                    });
                    console.log("DB Online");
                }
                catch (error) {
                    console.log(error);
                    throw new Error("DB Error");
                }
            }
        });
    }
    //CloseDB connection
    closeDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose.connection.close().then(() => console.log("DB close"));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.MongoDB = MongoDB;
//# sourceMappingURL=db.js.map