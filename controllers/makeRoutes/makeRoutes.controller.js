const RoutesService = require("../../services/routesServices");

const routesServices = new RoutesService();

const getMakeRoutes = async (req, res) => {
  //Id = User id from JWT
  const { id } = req;
  //Params status, comuna, limit in req.query
  const { status = false, comuna = "Santiago", limit = 2 } = req.query;

  const comunaToLower = comuna.toLowerCase();

  const sql = {
    user: id,
    deliveryStatus: status,
    comuna: comunaToLower,
  };
  try {
    const data = await routesServices.makeRoute(sql, limit);
    const { findTrips, countTrips } = data;

    if (findTrips == false)
      return res.status(400).json({
        error: "There no route in your list",
      });

    res.status(200).json({
      data: findTrips,
      count: countTrips,
      msg: `Route successfuly make`,
    });
  } catch (err) {
    return err;
  }
};

const getRouterMaker = async (req, res) => {
  //get oruteID in params
  const { routeId } = req.params;

  try {
    const getRoute = await routesServices.getRouteData(routeId);

    if (getRoute == false)
      return res.status(400).json({
        error: "there no route in your list",
      });

    const getCoord = getRoute.map(
      async (trip) =>
        await routesServices.getCoord(`${trip.street} ${trip.number}`)
    );

    const promise = await Promise.all(getCoord);

    const joinRoute = promise.join(";");

    const { data } = await routesServices.getRoute(joinRoute);
    console.log(data);

    res.status(200).json({
      destination: data.destinations,
      distance: data.distances,
      msg: "Your details succesffuly ok",
    });
  } catch (error) {
    next(error);
  }
};

const postRouteMaker = async (req, res) => {
  const { id } = req;

  const { body: data } = req;

  try {
    const makeRoute = await routesServices.createRoute(id, data);
    res.status(201).json({
      data: makeRoute,
      msg: "Route succesffullly make",
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  getMakeRoutes,
  getRouterMaker,
  postRouteMaker,
};
