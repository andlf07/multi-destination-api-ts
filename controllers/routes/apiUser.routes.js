const { Router } = require("express");
const bcrypt = require("bcrypt");
const validationHandler = require("../../helpers/validation/validationHandler");
const {
  checkUserSchema,
  userIdSchema,
} = require("../../helpers/validation/checkUserSchema");
const userModel = require("../../lib/models/userModel");
const CrudService = require("../../services/crudService");

const crudService = new CrudService(userModel);

const router = Router();

//Get all Users? GET
router.get('/', async ( req, res, next ) => {
   try {
       const getAllUsers = await crudService.getCollection();

       res.status(200).json({
           data: getAllUsers,
           msg: 'All Users, sucessfully get'
       })

   } catch ( err ) {
       next( err )
   }
})

//Get one User by id? GET
router.get('/:userId', validationHandler({ userId: userIdSchema }), async ( req, res, next ) => {
   //get id in params
   const { userId } = req.params;

   try {
       const userById = await crudService.singleDocument( userId )
       res.status(200).json({
           data: userById,
           msg: `User id: ${userId} sucessfully get`
       })
   } catch ( err ) {
       next( err )
   }
})


//Create a User? POST
router.post("/", validationHandler(checkUserSchema), async (req, res, next) => {
  //get user data
  const { body: data } = req;

  //Encrypt password with bcrypt
  const saltRounds = 6;
  const hashPassword = await bcrypt
    .hash(data.password, saltRounds)
    .then((hash) => hash);
  data.password = hashPassword;

  try {
    const createUser = await crudService.createDocument(data);
    res.status(201).json({
      data: createUser,
      msg: `user: ${data.name}, sucessfully create`,
    });
  } catch (err) {
    next(err);
  }
});

//Update a User? PUT
router.put('/:userId', validationHandler({ userId: userIdSchema }, 'params'), async ( req, res, next ) => {
   //Get tripId and trip to update
   const { userId } = req.params;
   const { body: userData } = req;
   try {
       //Using crudService findByIdAndUpdate
       const updateUser = await crudService.updateDocument(  userId, userData  );
       //send response
       res.status(200).json({
           data: updateUser,
           msg: 'Order Trip, sucessfully update'
       })
   } catch (err) {
       next( err )
   }
})
//Delete a User? DELETE
router.delete(
  "/:idUser",
  validationHandler({ idUser: userIdSchema }, "params"),
  async (req, res, next) => {
    const { idUser } = req.params;
    try {
      const deleteTripId = await crudService.deleteDocument(idUser);

      res.status(200).json({
        idDelete: deleteTripId,
        msg: "User sucessfully delete",
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
