const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const verifyToken = require('../middlewares/authmiddleware');

        
router.post('/createworkoutlog',verifyToken,workoutController.createworkoutlog);
          
router.get('/getworkoutlog', workoutController.getworkoutlog);

router.get('/getworkoutlogbyId', verifyToken,workoutController.getworkoutlogbyId);


router.put('/updateworkoutlog:id', verifyToken,workoutController.updateworkoutlog);

router.delete('/deleteworkoutlog:id', verifyToken,workoutController.deleteworkoutlog);



module.exports = router;
