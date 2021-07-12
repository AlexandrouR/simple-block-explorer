const bcUtils = require('../blockchainUtils');
const express = require("express");
const router = express.Router();
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}


router.get('/block/:number', function (req, res, next) {
    const blockNumber = req.params.number;
    bcUtils.getBlock(blockNumber).then(result => {
        res.render('block_details', {block: result});
    });
});
router.get('/transaction/:transactionHash', function (req, res, next) {
    const transactionHash = req.params.transactionHash;
    bcUtils.getTransaction(transactionHash).then(result => {
        res.render('transaction_details', {transaction: result});
    });
})

router.get('/:page?', function (req, res, next) {
    const page = req.params.page || 0;


    bcUtils.getBlock('latest').then(result => {
        res.render('blocks', {
            blocks: [...range(result.number - page * 100 - 100, result.number - page * 100)].reverse(),
            nextPage: parseInt(page) + 1,
            prevPage: page > 1 ? parseInt(page) - 1 : 0
        });
    });
});

module.exports = router;
