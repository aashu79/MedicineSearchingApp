const express = require('express');
const router = express.Router();
const {getAllContactUs, createContactUs, deleteContactUs} = require('../controllers/contactUs.controller');

const authVerifier = require('../middelwares/authVerifier.middelware');


router.get('/', authVerifier, getAllContactUs);
router.post('/', createContactUs);
router.delete('/:id', authVerifier,deleteContactUs);


module.exports = router;