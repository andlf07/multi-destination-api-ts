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
exports.MapBoxService = void 0;
const axios = require("axios");
class MapBoxService {
    getCoord(address = "") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //http to MAPBOX API
                const instance = axios.create({
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?`,
                    params: {
                        country: "cl",
                        access_token: process.env.MAPBOX_KEY,
                        limit: 1,
                        language: "es",
                    },
                });
                const getData = yield instance.get();
                const { data } = getData;
                return {
                    lng: data.feature.center[0],
                    lat: data.feature.center[1]
                };
            }
            catch (error) {
                return [];
            }
        });
    }
    getRoute(coord = "") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const instance = axios.create({
                    baseURL: `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${coord}?`,
                    params: {
                        // country: "cl",
                        access_token: process.env.MAPBOX_KEY,
                        // //where start?
                        // sources: "0",
                        //get only distance
                        annotations: "distance",
                        //destination
                        // destinations: "",
                    },
                });
                const data = yield instance.get();
                return data;
            }
            catch (error) {
                return [];
            }
        });
    }
}
exports.MapBoxService = MapBoxService;
//# sourceMappingURL=mapBoxService.js.map