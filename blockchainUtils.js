const Web3 = require("web3");

const web3j = new Web3("https://rinkeby.infura.io/v3/4fea577001cb41a587bb36a7af0c6fdc");


const getBlock = (block) => {
    return web3j.eth.getBlock(block);
}
const getTransaction = (transactionHash) => {
    return web3j.eth.getTransaction(transactionHash);
}


module.exports = {getBlock, getTransaction};
;