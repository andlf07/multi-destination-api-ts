const { response } = require("express");

const UserService = require("../../services/userService");

const userService = new UserService();

const getUsers = async (req, res = response) => {
  try {
    const getAllUsers = await userService.getAllUsers();

    res.status(200).json({
      data: getAllUsers,
      msg: "All users collection",
    });
  } catch (err) {
    return err;
  }
};

const getSingleUser = async (req, res = response) => {
  //Get userId in JWT
  const { userId } = req.params;

  try {
    const userById = await userService.singleUser(userId);

    if (!userById) {
      return res.status(400).json({
        error: "user not exist"
      });
    }

    res.status(200).json({
      data: userById,
      msg: `User id: ${userId}`,
    });
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res = response) => {
  //get user data
  const { body: data } = req;
  try {
    const createUser = await userService.createUser(data);
    res.status(201).json({
      data: createUser,
      msg: `User: ${data.name} create`,
    });
  } catch (err) {
    return err;
  }
};

const putUser = async (req, res = response) => {
  //get userId and Data
  const { userId } = req.params;
  const { body: userData } = req;
  try {
    const updateUser = await userService.updateUser(userId, userData);

    if (!updateUser) {
      return res.status(400).json({
        error: "user not exist"
      })
    }
;

    res.status(200).json({
      data: updateUser,
      msg: "User update",
    });
  } catch (err) {
    return err;
  }
};

const deleteUser = async (req, res = response) => {
  const { userId } = req.params;
  try {
    const deleteUserById = await userService.deleteUser(userId);

    if(!deleteUserById) {
      return res.status(400).json({
        error: "user not exist"
      })
    }

    res.status(200).json({
      data: deleteUserById,
      msg: 'User delete'
    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  postUser,
  putUser,
  deleteUser,
};
