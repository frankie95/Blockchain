var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const uuid = require('uuid/v1')
const rp = require('request-promise')
const nodeAddress = uuid()
  .split('-')
  .join('')
const port = process.argv[2]
const bitcoin = new Blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/blockchain', (req, res) => {
  res.send(bitcoin)
})

app.post('/transaction', (req, res) => {
  const blockIndex = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  )
  res.json({ note: `Transaction will be added in block ${blockIndex}.` })
})

app.post('/transaction/broadcast', (req, res) => {
  const newTransaction = bitcoin.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  )
  bitcoin.addTransactionToPendingTransaction(newTransaction)
  const requestPromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    }
    requestPromises.push(rp(requestOptions))
  })
  Promise.all(requestPromises).then(data=>{
    res.json({note: 'Transaction created and broadcast successfully.'})
  })
})

app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock()
  const previousBlockHash = lastBlock['hash']
  const currentBlockData = {
    transaction: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  )
  bitcoin.createNewTransaction(12.5, '00', nodeAddress)
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)
  res.json({
    note: 'New block mined successfully',
    block: newBlock
  })
})
app.post('/register-and-broadcast-node', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl
  if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) {
    bitcoin.networkNodes.push(newNodeUrl)
  }
  const regNodesPromises = []
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true
    }

    regNodesPromises.push(rp(requestOptions))
  })
  Promise.all(regNodesPromises)
    .then(data => {
      const requestOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: {
          allNetworkNotes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
        },
        json: true
      }
      return rp(requestOptions)
    })
    .then(data => {
      res.json({ note: 'New node registered successfully.' })
    })
})

app.post('/register-node', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl)
  }
  res.json({ note: 'New node registered successfully.' })
})

app.post('/register-nodes-bulk', (req, res) => {
  const allNetworkNotes = req.body.allNetworkNotes
  allNetworkNotes.forEach(networkNode => {
    const nodeNotAlreadyPresent =
      bitcoin.networkNodes.indexOf(networkNode) == -1
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNode
    if (nodeNotAlreadyPresent && notCurrentNode) {
      bitcoin.networkNodes.push(networkNode)
    }
  })
  res.json({ note: 'Bulk registrtation successful.' })
})

app.listen(port, () => {
  console.log(`running ${port}`)
})
