const Blockchain = require('./blockchain')

const bitcoin = new Blockchain()
const previousBlockHash = 'asdfasd1'
const currentBlockData = [
  { amount: 500, sender: 'alex', recipient: 'jenn' },
  { amount: 10, sender: 'alex', recipient: 'jenn' }
]
const nonce = 100

console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,136942))
//bitcoin.createNewBlock(2389, 'asdasdasdasd', 'awewsdfx')
//bitcoin.createNewTransaction(100, 'alex', 'jenn')
//bitcoin.createNewBlock(232389, 'asdasdasd1asd', 'awe2wsdfx')
//bitcoin.createNewTransaction(500, 'alex', 'jenn')
//bitcoin.createNewTransaction(10, 'alex', 'jenn')

console.log(bitcoin)
