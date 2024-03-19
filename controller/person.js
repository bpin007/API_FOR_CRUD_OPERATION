const Person = require("../models/person-schema");
const generateWebToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const createPerson = async (req, res) => {
  const { name = "", email = "", password = "" } = req.body || {};
  try {
    const person = await Person.create({
      name,
      email,
      password,
    });
    console.log({ person });
    res.status(200).json({
      _id: person._id,
      email: person.email,
      password: person.password,
      // token: generateWebToken(person._id),
      message: "User is created successfully!!!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create user",
      success: false,
    });
  }
};

const Login = async (req, res) => {
  // jwt.verify(req.token, "bipin", (err, authData) => {
  //   if (err) {
  //     res.send({ message: "invalid token" });
  //   } else {
  //     res.json({
  //       message: "profile accessed",
  //     });
  //   }
  // });
  const { email = "", password = "" } = req.body || {};
  // const user = await Person.findOne({ $and: [{ email }, { password }] });
  const user = await Person.findOne(
    { email, password },
    { name: 1, email: 1, _id: 1 }
  );
  console.log(user);
  if (user) {
    const token = await generateWebToken({ id: user._id });
    res.status(200).json({
      message: "Login success!",
      success: true,
      token,
      data: user,
    });
  } else
    return res.status(401).json({
      message: "Invalid credentials!",
      success: false,
    });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Person.find({ is_active: false });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUSers = async (req, res) => {
  try {
    const { id = "" } = req.params;
    const deletedUser = await Person.findByIdAndUpdate(id, { is_active: true });
    res.status(200).json(deletedUser);
  } catch (erro) {
    console.log(erro);
  }
};


module.exports = {
  createPerson,
  getAllUsers,
  deleteUSers,
  Login,
};
