const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/categories", require("./categories.routes"));
router.use("/manufacturer", require("./manufacturer.routes"));
router.use("/goods", require("./goods.routes"));
router.use("/user", require("./user.routes"));
router.use("/auth", require("./auth.routes"));

module.exports = router;
