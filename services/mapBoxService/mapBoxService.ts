const axios = require("axios");

export class MapBoxService {

   async getCoord(address: string = ""): Promise<Coord | []> {
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
        const getData = await instance.get()

        const { data } = getData;
        return {
          lng: data.feature.center[0],
          lat: data.feature.center[1]
        }
      } catch (error) {
        return [];
      }
    }
    async getRoute(coord: string = ""): Promise<[]> {
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
        const data: [] = await instance.get();
        return data;
      } catch (error) {
        return [];
      }
    }
}