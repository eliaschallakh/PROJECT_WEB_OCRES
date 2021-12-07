const axios = require('axios');

const topscorers = async () => {
  const url =
    'https://app.sportdataapi.com/api/v1/soccer/topscorers?apikey=e41592a0-5151-11ec-b08b-6588e14a303f&season_id=1980';
  const res = await axios.get(url);
  return res.data.data;
};

const ranking = async () => {
    const url =
      'https://apiv3.apifootball.com/?action=get_standings&league_id=152&APIkey=0ec50640f3c9bc08abfd7ed0da02954192104c498fb6f643a491dae1c2861bc0';
    const res = await axios.get(url);
    return res.data;
  };

  const matches = async (req) => {
    let url =
      'https://apiv2.apifootball.com/?action=get_events&from=2021-08-14&to=2022-05-22&league_id=148&APIkey=0ec50640f3c9bc08abfd7ed0da02954192104c498fb6f643a491dae1c2861bc0';
      const res = await axios.get(url);
      return res.data;
  };

  const liveMatches = async (req) => {
    let url =
      'https://app.sportdataapi.com/api/v1/soccer/matches?apikey=e41592a0-5151-11ec-b08b-6588e14a303f&season_id=1980&live=true';
     const res = await axios.get(url);
    return res.data;
  };

  const venues = async () => {
    const url =
      'https://app.sportdataapi.com/api/v1/soccer/venues?apikey=e41592a0-5151-11ec-b08b-6588e14a303f&country_id=42';
    const res = await axios.get(url);
    return res.data;
  };

  const lineup = async (req) => {
    let url =
      `https://apiv3.apifootball.com/?action=get_lineups&APIkey=0ec50640f3c9bc08abfd7ed0da02954192104c498fb6f643a491dae1c2861bc0`;
      if(req.hasOwnProperty('match_id')){
        url = url + `&match_id=${req.match_id}`
      }
    const res = await axios.get(url);
    return res.data;
  };

  const odds = async (req) => {
    const url =
      `https://app.sportdataapi.com/api/v1/soccer/odds/${req.params.id}?apikey=e41592a0-5151-11ec-b08b-6588e14a303f&type=${req.params.type}`;
    const res = await axios.get(url);
    return res.data;
  };

  const getAllMatchesForOdds = async () => {
      const url = 'https://app.sportdataapi.com/api/v1/soccer/matches?apikey=e41592a0-5151-11ec-b08b-6588e14a303f&season_id=1980';
      const res = await axios.get(url);
      return res.data;
  }

module.exports = {
    topscorers,
    ranking,
    matches,
    liveMatches,
    venues,
    lineup,
    odds,
    getAllMatchesForOdds
};