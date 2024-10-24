const express = require("express");
const router = express.Router();
const users = require("../controllers/usersControllers");

//route user
/**
 * @swagger
 * /users:
 *  get:
 *      summary: Menampilkan list semua user
 *      description: menampilkan semua list user yang ada
 *      tags:
 *       - Users
 *      responses:
 *          '201':
 *              description: sukses menampilkan semua list user
 *          '409':
 *              description: Daftar akun tidak ada
 *          '500':
 *              description: Terjadi kesalahan pada server
 */
router.get("/users", users.showUsers);

/**
 * @swagger
 * /users/{usersId}:
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
 *         description: berhasil menambah user dan profil
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
 *       500:
 *         description: gagal menambahkan user
 */
router.post("/users", users.createUsers);

/**
 * @swagger
 * /users/{usersId}:
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
 *                 description: Nama pengguna
 *               email:
 *                 type: string
 *                 description: Email pengguna
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *               identify_type:
 *                 type: string
 *                 description: Tipe identitas pengguna (misalnya KTP, SIM, dll.)
 *               identify_number:
 *                 type: string
 *                 description: Nomor identitas pengguna
 *               address:
 *                 type: string
 *                 description: Alamat pengguna
 *             example:
 *               name: "Nama Pengguna"
 *               email: "email@example.com"
 *               password: "password123"
 *               identify_type: "KTP"
 *               identify_number: "123456789"
 *               address: "Alamat lengkap pengguna"
 *     responses:
 *       201:
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
 *       409:
 *         description: Email sudah digunakan oleh pengguna lain
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
 * /users/{usersId}:
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
 *         description: Data user berhasil dihapus
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
 *         description: Data user tidak ditemukan
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
