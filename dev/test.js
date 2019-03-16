const Blockchain = require('./blockchain')

const bitcoin = new Blockchain()
//const previousBlockHash = 'asdfasd1'
//const currentBlockData = [
//  { amount: 500, sender: 'alex', recipient: 'jenn' },
//  { amount: 10, sender: 'alex', recipient: 'jenn' }
//]
//const nonce = 100
//
//console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,136942))
////bitcoin.createNewBlock(2389, 'asdasdasdasd', 'awewsdfx')
////bitcoin.createNewTransaction(100, 'alex', 'jenn')
////bitcoin.createNewBlock(232389, 'asdasdasd1asd', 'awe2wsdfx')
////bitcoin.createNewTransaction(500, 'alex', 'jenn')
////bitcoin.createNewTransaction(10, 'alex', 'jenn')
//
//console.log(bitcoin)

const blockchain1={"chain":[{"index":1,"timestamp":1551702205565,"transactions":[],"nonce":100,"hash":"0","previousBlockHash":"0"},{"index":2,"timestamp":1551702332491,"transactions":[],"nonce":18140,"hash":"0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100","previousBlockHash":"0"},{"index":3,"timestamp":1551703543322,"transactions":[{"amount":12.5,"sender":"00","recipient":"4f1a1da03e7811e994e4637b1b48082f","transactionId":"9ad133f03e7811e994e4637b1b48082f"},{"amount":100,"sender":"sdfsdf","recipient":"sdfsdfasdxcvxzfsdf","transactionId":"5c2579103e7b11e994e4637b1b48082f"},{"amount":100,"sender":"sdfsdf","recipient":"sdfsdfsdfsdfsdfsdfasdxcvxzfsdf","transactionId":"6122a2303e7b11e994e4637b1b48082f"},{"amount":110,"sender":"sdfeaseasdfsdfdf","recipient":"sdfsdfsdfsdfsdfsdfasdxcvxzfsdf","transactionId":"636b32a03e7b11e994e4637b1b48082f"}],"nonce":129335,"hash":"00007f4bfce8519be39f44f41f4dbebf70842e9ea3cefcd929b458a2442d8d97","previousBlockHash":"0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"},{"index":4,"timestamp":1551703585086,"transactions":[{"amount":12.5,"sender":"00","recipient":"4f1a1da03e7811e994e4637b1b48082f","transactionId":"6c7865c03e7b11e994e4637b1b48082f"}],"nonce":25617,"hash":"0000e9ca6b49bf7a4271c03b6d719eb3f254290ed30a63f0188fbb29e1e0579c","previousBlockHash":"00007f4bfce8519be39f44f41f4dbebf70842e9ea3cefcd929b458a2442d8d97"}],"pendingTransactions":[{"amount":12.5,"sender":"00","recipient":"4f1a1da03e7811e994e4637b1b48082f","transactionId":"855d14003e7b11e994e4637b1b48082f"}],"currentNodeUrl":"http://localhost:3001","networkNodes":[]}
console.log(bitcoin.chainIsValid(blockchain1.chain))