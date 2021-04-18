const { Router } = require("express");
const validationHandler = require("../../helpers/validation/validationHandler");
const {
  checkUserSchema,
  userIdSchema,
} = require("../../helpers/validation/checkUserSchema");
const UserService = require("../../services/userService");
const validateJWT = require("../middlewares/validateJWT");
const validateUserType = require("../middlewares/userType");

const userService = new UserService();

const router = Router();

//Get all Users? GET
router.get("/", [validateJWT, validateUserType], async (req, res, next) => {
  try {
    const getAllUsers = await userService.getAllUsers();

    res.status(200).json(getAllUsers);
  } catch (err) {
    next(err);
  }
});

//Get one User by id? GET
router.get(
  "/:userId",
  [validateJWT, validateUserType, validationHandler({ userId: userIdSchema })],
  async (req, res, next) => {
    const { userId } = req.params
    try {
      const userById = await userService.singleUser(userId);
      res.status(200).json(userById);
    } catch (err) {
      next(err);
    }
  }
);

//Create a User? POST
router.post("/", validationHandler(checkUserSchema), async (req, res, next) => {
  //get user data
  const { body: data } = req;
  try {
    const createUser = await userService.createUser(data);
    res.status(201).json(createUser);
  } catch (err) {
    next(err);
  }
});

//Update a User? PUT
router.put(
  "/:userId",
  [validateJWT, validationHandler({ userId: userIdSchema }, "params")],
  async (req, res, next) => {
    //Get tripId and trip to update
    const { userId } = req.params;
    const { body: userData } = req;
    try {
      //Using crudService findByIdAndUpdate
      const updateUser = await userService.updateUser(userId, userData);
      //send response
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  }
);
//Delete a User? DELETE
router.delete(
  "/:userId",
  [
    validateJWT,
    validateUserType,
    validationHandler({ userId: userIdSchema }, "params"),
  ],
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const deleteTripId = await userService.deleteUser(userId);

      res.status(200).json(deleteTripId);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
