const express = require("express");
const router = express.Router();
const bcUtils = require('../../blockchainUtils');
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /products"
    });
});
router.post("/", (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product
    });
});

router.get("/number/:number", (req, res, next) => {
    const id = req.params.number;
    bcUtils.getBlock(id).then(result => {
        res.status(200).json(result);
    });

});

router.get("/:productID", (req, res, next) => {
    next();
});
router.delete("/:productID", (req, res, next) => {
    res.status(200).json({
        message: "Deleted product!"
    });
});

module.exports = router;
