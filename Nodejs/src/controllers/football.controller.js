const { footballService } = require('../services');

const TopScorer= async (req, res) => {
  const data = await footballService.topscorers();
  res.status('200').send(data);
};

const Ranking= async (req, res) => {
    const data = await footballService.ranking();
    res.status('200').send(data);
  };
  
  const Matches= async (req, res) => {
    const data = await footballService.matches(req.query);
    res.status('200').send(data);
  };
  const LiveMatches= async (req, res) => {
    const data = await footballService.liveMatches(req);
    res.status('200').send(data);
  };
  const Venues= async (req, res) => {
    const data = await footballService.venues();
    res.status('200').send(data);
  };

  const LineUp= async (req, res) => {
    const data = await footballService.lineup(req.query);
    res.status('200').send(data);
  };

  const Odds= async (req, res) => {
    const data = await footballService.odds(req);
    res.status('200').send(data);
  };

  const getAllMatches= async (req, res) => {
    const data = await footballService.getAllMatchesForOdds();
    res.status('200').send(data);
  };

module.exports = {
    TopScorer,
    Ranking,
    Matches,
    LiveMatches,
    getAllMatches,
    Venues,
    LineUp,
    Odds
};