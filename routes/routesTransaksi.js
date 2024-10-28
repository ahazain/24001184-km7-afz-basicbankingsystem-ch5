const express = require("express");
const router = express.Router();
const transaksi = require("../controllers/transaksiControllers");

//route transaksi
/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     summary: Menampilkan daftar semua transaksi
 *     tags: [Transaksi]
 *     responses:
 *       200:
 *         description: Berhasil menampilkan daftar transaksi
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
 *                   example: "berhasil menampilkan daftar transaksi"
 *                 insertData:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Daftar data transaksi kosong
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/transactions", transaksi.showTransaksi);

/**
 * @swagger
 * /api/v1/transactions/{transactionId}:
 *   get:
 *     summary: Menampilkan detail transaksi berdasarkan ID
 *     tags: [Transaksi]
 *     parameters:
 *       - name: transactionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil menampilkan detail transaksi
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
 *                   example: "berhasil menampilkan detail transaksi"
 *                 data:
 *                   type: object
 *       404:
 *         description: Data detail transaksi kosong
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.get("/transactions/:transactionId", transaksi.showTransaksiId);

/**
 * @swagger
 * /api/v1/transactions:
 *   post:
 *     summary: Membuat transaksi baru
 *     tags: [Transaksi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sourceAccountId:
 *                 type: integer
 *               destinationAccountId:
 *                 type: integer
 *               amount:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Transaksi berhasil
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
 *                   example: "Transaksi berhasil"
 *                 transaksi:
 *                   type: object
 *       400:
 *         description: Mohon lengkapi semua data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Terjadi kesalahan pada server"
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.post("/:transactions", transaksi.createTransaksi);

/**
 * @swagger
 * /api/v1/transactions/{transactionId}:
 *   delete:
 *     summary: Menghapus transaksi berdasarkan ID
 *     tags: [Transaksi]
 *     parameters:
 *       - name: transactionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Berhasil hapus transaksi
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
 *                   example: "berhasil hapus Transaksi"
 *                 data:
 *                   type: object
 *       404:
 *         description: tidak ada transaksi
 *       500:
 *         description: Terjadi kesalahan pada server
 */
router.delete("/transactions/:transactionId", transaksi.destroyTransaksi);

module.exports = router;
