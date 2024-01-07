const express = require('express');
const router = express.Router();
const authVerifier = require('../middelwares/authVerifier.middelware');

const {getCompany, createCompany, updateCompany, deleteCompany} = require('../controllers/company.controller');


router.get('/', getCompany);
router.post('/', authVerifier, createCompany);
router.patch('/:id', authVerifier, updateCompany);
router.delete('/:id', authVerifier, deleteCompany);


module.exports = router;