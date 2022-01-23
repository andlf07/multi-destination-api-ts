import { Request, Response } from "express";
import { MapBoxService } from "../../services/mapBoxService/mapBoxService";
import { sqlRoute } from "../../services/routesServices/interface";
import { RoutesService } from "../../services/routesServices/routesServices";



const routesServices = new RoutesService();
const mapBoxService = new MapBoxService();

export const getMakeRoutes = async (req: Request, res: Response) => {
  //Id = User id from JWT
  const { id }:any  = req;
  //Params status, comuna, limit in req.query
  const { status = false, comuna = "Santiago", limit = 2 }= req.query as any;

  const comunaToLower = comuna.toLowerCase();

  const sql: sqlRoute = {
    user: id,
    deliveryStatus: status,
    comuna: comunaToLower,
  };
  try {
    const data = await routesServices.makeRoute(sql, limit);
    const { findTrips, countTrips } = data;

    if (!findTrips)
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

export const getRouterMaker = async (req: Request, res: Response) => {
  //get oruteID in params
  const { routeId } = req.params;

  try {
    const getRoute = await routesServices.getRouteData(routeId);

    if (!getRoute)
      return res.status(400).json({
        error: "there no route in your list",
      });

    const getCoord = getRoute.map(
      async (trip: tripInterface) =>
        await mapBoxService.getCoord(`${trip.street} ${trip.number}`)
    );

    const promise = await Promise.all(getCoord);

    const joinRoute = promise.join(";");

    const { data }: any = await mapBoxService.getRoute(joinRoute);
    console.log(data);

    res.status(200).json({
      destination: data.destinations,
      distance: data.distances,
      msg: "Your details succesffuly ok",
    });
  } catch (error) {
    return(error);
  }
};

export const postRouteMaker = async (req: Request, res: Response) => {
  const { id }: any = req;

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
