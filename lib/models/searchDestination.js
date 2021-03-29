const axios = require('axios');


class Search {
   constructor() {

   }

   async getDestinationData( init = '', to = ''  ) {


      try {

         const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ init }.json`,
            params: {
               'access_token': 'pk.eyJ1IjoiZmVyc29yYyIsImEiOiJja2xpMGIxbHkwM29uMnZvMGtnaTZpb29kIn0.jDSjxQFokimAd3rNvu2qVw',
               'country': 'cl',
               'language': 'es',
               'limit': 2
            }
         });

         const resp = await instance.get();

         return resp;


      } catch (error) {
         console.log(error)
      }

   }


}


module.exports = Search;