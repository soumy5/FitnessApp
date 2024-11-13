const express = require('express');
const router = express.Router();
const fitnessPlanController = require('../controllers/fitnessPlanController');
const verifyToken = require('../middlewares/authmiddleware');
const verifyRole = require('../middlewares/roleMiddleware');


        
router.post('/createFitnessPlan',verifyToken,verifyRole.trainerRole,fitnessPlanController.createFitnessPlan);
         
router.get('/getFitnessPlans',verifyToken,fitnessPlanController.getFitnessPlans);


router.get('/getFitnessPlanById', verifyToken,fitnessPlanController.getFitnessPlanById);



module.exports = router;
