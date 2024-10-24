const express = require("express");
const router = express.Router();
const users = require("../controllers/usersControllers");
const akun = require("../controllers/akunControlers");
const transaksi = require("../controllers/transaksiControllers");

//route user
/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      responses:
 *          '201':
 *              description: List of users retrieved successfully
 */
router.get("/users", users.showUsers);

/**
 * @swagger
 * /users/{usersId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a specific user's details by their ID, including their profile information.
 *     parameters:
 *       - in: path
 *         name: usersId
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 profile:
 *                   type: object
 *                   properties:
 *                     bio:
 *                       type: string
 *                       example: Developer at XYZ Corp
 *                     age:
 *                       type: integer
 *                       example: 30
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/users/:usersId", users.showUsersId);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type: object
 *                 properties:
 *                   identify_type:
 *                     type: string
 *                   identify_number:
 *                     type: string
 *                   address:
 *                     type: string
 *                 required:
 *                   - identify_type
 *                   - identify_number
 *                   - address
 *             required:
 *               - name
 *               - email
 *               - password
 *               - profile
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/users", users.createUsers);

/**
 * [updateUsers description]
 *
 * @var {[type]}
 */
router.put("/users/:usersId", users.updateUsers);

/**
 * [destroyUsers description]
 *
 * @var {[type]}
 */
router.delete("/users/:usersId", users.destroyUsers);
//route akun
router.get("/accounts", akun.showAccounts);
router.get("/accounts/:accountsId", akun.showAccountsId);
router.post("/accounts", akun.createAccounts);
router.put("/accounts/:accountsId", akun.updateAccounts);
router.delete("/accounts/:accountsId", akun.destroyAccounts);
//route transaksi
router.get("/:transactions", transaksi.showTransaksi);
router.get("/:transactions/:transactionId", transaksi.showTransaksiId);
router.post("/:transactions", transaksi.createTransaksi);
router.put("/transactions/:transactionId", transaksi.updateTransaksi);
router.delete("/:transactions/:transactionId", transaksi.destroyTransaksi);

module.exports = router;
