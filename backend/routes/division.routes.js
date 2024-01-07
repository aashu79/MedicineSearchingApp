const express = require('express');
const router = express.Router();
const authVerifier = require('../middelwares/authVerifier.middelware');


const {getDivision, createDivision, updateDivision, deleteDivision, getSingleDivision} = require('../controllers/division.controller');


router.get('/', getDivision);
router.get('/:id',authVerifier, getSingleDivision);
router.post('/',authVerifier, createDivision);
router.patch('/:id',authVerifier, updateDivision);
router.delete('/:id',authVerifier, deleteDivision);


module.exports = router;