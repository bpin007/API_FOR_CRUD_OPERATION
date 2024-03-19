const express = require("express");
const {
  createPerson,
  getAllUsers,
  deleteUSers,
  Login,
} = require("../controller/person");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/createPerson", createPerson);
router.get("/getAllUsers", verifyToken, getAllUsers);
router.delete("/deleteUsers/:id", deleteUSers);
router.post("/login", Login);

module.exports = router;
// Create Admin api
/**
 * security:
 *  - bearerAuth: []
 *
 * @swagger
 *  description: Create Admin
 * /api/users/createPerson:
 *  post:
 *      tags: [Admin]
 *      summary: Create Admin.
 *      consumes:
 *       - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                 type: string
 *              email:
 *                 type: string
 *              password:
 *                type: string
 *      responses:
 *        default:
 *          description: default response
 */

// Login Admin api
/**
 * @swagger
 *  description: Login Admin
 * /api/users/login:
 *  post:
 *      tags: [Admin]
 *      summary: Login Admin.
 *      consumes:
 *       - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                 type: string
 *              password:
 *                type: string
 *      responses:
 *        default:
 *          description: default response
 */

/**
 * @swagger
 * description: Get Admin
 * /api/users/deleteUser/{userId}:
 *  delete:
 *      tags: [Admin]
 *      description: Delete user
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: string
 *          required: true
 *          description: string id of user to delete
 *      responses:
 *          200:
 *              description: User that was deleted
 */

/**
/**
 * @swagger
 * /api/users/getAllUsers:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get All Users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 */
