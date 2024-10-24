const express = require("express");
const router = express.Router();
const transaksi = require("../controllers/transaksiControllers");

//route transaksi
router.get("/:transactions", transaksi.showTransaksi);
router.get("/:transactions/:transactionId", transaksi.showTransaksiId);
router.post("/:transactions", transaksi.createTransaksi);
router.put("/transactions/:transactionId", transaksi.updateTransaksi);
router.delete("/:transactions/:transactionId", transaksi.destroyTransaksi);

module.exports = router;
