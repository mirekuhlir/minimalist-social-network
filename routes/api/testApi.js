const express = require('express');

const router = express.Router();

// 200 OK
router.get('/mytest', (req, res) => res.json({ msg: 'It working!' }));

module.exports = router;
