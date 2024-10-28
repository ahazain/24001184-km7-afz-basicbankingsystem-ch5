const express = require("express");
const router = express.Router();
const users = require("../controllers/usersControllers");

//route user
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: Menampilkan list semua user
 *      description: menampilkan semua list user yang ada
 *      tags:
 *       - Users
 *      responses:
 *          '200':
 *              description: Berhasil menampilkan daftar user
 *          '409':
 *              description: Daftar Users tidak ada
 *          '500':
 *              description: Terjadi kesalahan pada server
 */
router.get("/users", users.showUsers);

/**
 * @swagger
 * /api/v1/users/{usersId}:
 *   get:
 *     summary: menampilkan user berdasarkan Id
 *     description: menampilkan secara detail user berdasarkan id dan profil user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: usersId
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: berhasil menampilkan detail user
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
 *         description: Data Detail User tidak ada"
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/users/:usersId", users.showUsersId);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Menambah data user baru
 *     description: Menambah data user baru dan profil
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "kopling"
 *               email:
 *                 type: string
 *                 example: "kopling@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123yuya"
 *               profile:
 *                 type: object
 *                 properties:
 *                   identify_type:
 *                     type: string
 *                     example: "KTP"
 *                   identify_number:
 *                     type: string
 *                     example: "123456789"
 *                   address:
 *                     type: string
 *                     example: "123 Main St, Springfield"
 *     responses:
 *       201:
 *         description: Data user berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 insertData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "kopling"
 *                     email:
 *                       type: string
 *                       example: "kopling@gmail.com"
 *                     profile:
 *                       type: object
 *                       properties:
 *                         identify_type:
 *                           type: string
 *                           example: "KTP"
 *                         identify_number:
 *                           type: string
 *                           example: "123456789"
 *                         address:
 *                           type: string
 *                           example: "123 Main St, Springfield"
 *       400:
 *         description:  Email sudah terdaftar
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/users", users.createUsers);

/**
 * @swagger
 * /api/v1/users/{usersId}:
 *   put:
 *     summary: Update data pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: usersId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari pengguna
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "kopling"
 *               email:
 *                 type: string
 *                 example: "kopling@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123yuya"
 *               profile:
 *                 type: object
 *                 properties:
 *                   identify_type:
 *                     type: string
 *                     example: "KTP"
 *                   identify_number:
 *                     type: string
 *                     example: "123456789"
 *                   address:
 *                     type: string
 *                     example: "123 Main St, Springfield"
 *     responses:
 *       '200':
 *         description: Data user berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     profile:
 *                       type: object
 *                       properties:
 *                         identify_type:
 *                           type: string
 *                         identify_number:
 *                           type: string
 *                         address:
 *                           type: string
 *       '404':
 *         description: Data pengguna tidak ada untuk diupdate
 *       '400':
 *         description: Email sudah terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
router.put("/users/:usersId", users.updateUsers);

/**
 * @swagger
 * /api/v1/users/{usersId}:
 *   delete:
 *     summary: Hapus data pengguna berdasarkan ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: usersId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID dari pengguna
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan sukses
 *                 insertData:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     profile:
 *                       type: object
 *                       properties:
 *                         identify_type:
 *                           type: string
 *                         identify_number:
 *                           type: string
 *                         address:
 *                           type: string
 *       404:
 *         description: Data user tidak tidak ada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data tidak ada
 *       500:
 *         description: Terjadi kesalahan pada server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Terjadi kesalahan pada server
 *                 error:
 *                   type: string
 */
router.delete("/users/:usersId", users.destroyUsers);

module.exports = router;
