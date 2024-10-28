const express = require("express");
const router = express.Router();
const akun = require("../controllers/akunControlers");

//route akun
/**
 * @swagger
 * /api/v1/accounts:
 *  get:
 *      summary: Menampilkan daftar semua akun
 *      description: api untuk menampilkan daftar akun
 *      tags:
 *       - Akun Bank
 *      responses:
 *          '200':
 *              description: Berhasil menampilkan daftar akun
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 200
 *                              message:
 *                                  type: string
 *                                  example: berhasil menampilkan daftar akun
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *          '404':
 *              description: Daftar akun tidak ada
 *          '500':
 *              description: Terjadi kesalahan pada server
 */
router.get("/accounts", akun.showAccounts);
/**
 * @swagger
 *  /api/v1/accounts/{accountsId}:
 *   get:
 *     summary: Menampilkan detail akun berdasarkan ID
 *     tags:
 *       - Akun Bank
 *     parameters:
 *       - name: accountsId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Berhasil menampilkan detail akun
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: berhasil menampilkan detail akun
 *                 data:
 *                   type: object
 *       '404':
 *         description: Detail akun tidak ada
 *       '500':
 *         description: Terjadi kesalahan pada server
 */
router.get("/accounts/:accountsId", akun.showAccountsId);

/**
 * @swagger
 * /api/v1/accounts:
 *   post:
 *     summary: Membuat akun baru
 *     tags:
 *      - Akun Bank
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_name:
 *                 type: string
 *               bank_account_number:
 *                 type: string
 *               balance:
 *                 type: number
 *                 format: float
 *               userId:
 *                  type: integer
 *     responses:
 *       '201':
 *         description: Berhasil membuat akun
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: berhasil membuat akun
 *                 insertData:
 *                   type: object
 *       '400':
 *         description: mohon lengkapi data yang ada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "lengkapi data yang kosong : bank_name, balance, bank_account_number, userId "
 *       '500':
 *         description: Terjadi kesalahan pada server
 */
router.post("/accounts", akun.createAccounts);

/**
 * @swagger
 * /api/v1/accounts/{accountsId}:
 *   put:
 *     summary: Mengupdate data akun berdasarkan ID
 *     tags:
 *      - Akun Bank
 *     parameters:
 *       - name: accountsId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_name:
 *                 type: string
 *               bank_account_number:
 *                 type: string
 *               balance:
 *                 type: number
 *                 format: float
 *               userId:
 *                  type: integer
 *     responses:
 *       '200':
 *         description: Berhasil update akun
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: berhasil update akun
 *                 updateData:
 *                   type: object
 *       '400':
 *         description: mohon lengkapi data yang ada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "lengkapi data yang kosong : bank_name, balance, bank_account_number, userId "
 *       '404':
 *         description: Data akun tidak ada untuk diupdate
 *       '500':
 *         description: Terjadi kesalahan pada server
 */
router.put("/accounts/:accountsId", akun.updateAccounts);

/**
 * @swagger
 * /api/v1/accounts/{accountsId}:
 *   delete:
 *     summary: Menghapus akun berdasarkan ID
 *     tags:
 *      - Akun Bank
 *     parameters:
 *       - name: accountsId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: data berhasil dihapus
 *                 data:
 *                   type: object
 *       404:
 *         description: Data Akun tidak ada
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/accounts/:accountsId", akun.destroyAccounts);

module.exports = router;
