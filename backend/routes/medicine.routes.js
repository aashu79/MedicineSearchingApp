const express = require('express');
const router = express.Router();
const authVerifier = require('../middelwares/authVerifier.middelware');

const {getMedicine, createMedicine, updateMedicine, deleteMedicine} = require('../controllers/medicine.controller');


router.get('/', getMedicine);
router.post('/',authVerifier, createMedicine);
router.patch('/:id',authVerifier, updateMedicine);
router.delete('/:id',authVerifier, deleteMedicine);


module.exports = router;