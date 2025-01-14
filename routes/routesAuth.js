const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const authenticateToken = require("../middlewares/authMiddleware");

// Route untuk render halaman registrasi
/**
 * @swagger
 * /auth/register:
 *   get:
 *     summary: Menampilkan halaman register
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Menampilkan halaman register
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/register", authController.renderRegister);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Mendaftarkan user baru
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "kopling1"
 *               email:
 *                 type: string
 *                 example: "32kopling@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123"
 *               profile:
 *                 type: object
 *                 properties:
 *                   identify_type:
 *                     type: string
 *                     example: "KTP"
 *                   identify_number:
 *                     type: string
 *                     example: "082642902"
 *                   address:
 *                     type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - profile
 *     responses:
 *       201:
 *         description: Register sukses
 *       409:
 *         description: Email sudah terdaftar
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Menampilkan halaman login
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Menampilkan halaman login
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get("/login", authController.renderLogin);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Melakukan login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login sukses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login sukses"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "32kopling@gmail.com"
 *
 *       '401':
 *         description: Email or password is wrong
 *       '500':
 *         description: Terjadi kesalahan pada server
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/authentication:
 *   get:
 *     summary: Menampilkan semua user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []   
 *     responses:
 *       200:
 *         description: Menampilkan halaman daftar user
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       401:
 *         description: Tidak terautentikasi, token tidak valid
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/authentication", authenticateToken, authController.autentifikasi);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Masukkan token JWT di sini
 */

module.exports = router;
