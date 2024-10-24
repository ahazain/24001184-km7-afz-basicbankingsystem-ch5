const express = require("express");
const router = express.Router();
const akun = require("../controllers/akunControlers");

//route akun
router.get("/accounts", akun.showAccounts);
router.get("/accounts/:accountsId", akun.showAccountsId);
router.post("/accounts", akun.createAccounts);
router.put("/accounts/:accountsId", akun.updateAccounts);
router.delete("/accounts/:accountsId", akun.destroyAccounts);

module.exports = router;
