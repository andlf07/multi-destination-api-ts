const { Router } = require("express");
const RoutesService = require("../../services/routesServices");
const routeModel = require("../../lib/models/routeModel");
const validateJWT = require("../middlewares/validateJWT");

const routesServices = new RoutesService();

const router = Router();

//get trips and make route base to params status, comuna, limit = how much trips
router.get("/", validateJWT, async (req, res, next) => {
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
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateJWT, async (req, res, next) => {
  const { id } = req;

  const { body: data } = req;
});

module.exports = router;
