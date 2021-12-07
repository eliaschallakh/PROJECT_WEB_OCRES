const express = require('express');
const { footballController } = require('../controllers');

const router = express.Router();

router.route('/topscorrer').get(footballController.TopScorer);

router.route('/ranking').get(footballController.Ranking);

router.route('/matches').get(footballController.Matches);
router.route('/matches/live').get(footballController.LiveMatches);
router.route('/matches/all').get(footballController.getAllMatches);

router.route('/venues').get(footballController.Venues);

router.route('/lineup').get(footballController.LineUp);

router.route('/odds/:id/:type').get(footballController.Odds);

module.exports = router;