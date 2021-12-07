import axios from "axios";

axios.defaults.withCredentials = true;


export const getStanding = () => (dispatch) => {
    axios.get("http://localhost:5000/football/ranking")
        .then((res) => {
                dispatch({
                    type: "listStanding",
                    payload: res
                });
            }
        )
        .catch((err) => {
            dispatch({
                type: "UnAuthorized"
            });
        });
};

export const getplayers = () => (dispatch) => {
    axios.get("http://localhost:5000/football/topscorrer")
        .then((res) => {
                dispatch({
                    type: "topscorers",
                    payload: res
                });
            }
        )
        .catch((err) => {
            dispatch({
                type: "UnAuthorized"
            });
        });
};

export const getvenue = () => (dispatch) => {

    axios.get("http://localhost:5000/football/venues")
        .then((res) => {
                dispatch({
                    type: "venues",
                    payload: res
                });
            }
        )
        .catch((err) => {
            dispatch({
                type: "UnAuthorized"
            });
        });
};

export const getMatches = () => (dispatch) => {

    axios.get("http://localhost:5000/football/matches")
        .then((res) => {
                dispatch({
                    type: "matches",
                    payload: res
                });
            }
        )
        .catch((err) => {
            dispatch({
                type: "UnAuthorized"
            });
        });
};

export const getLive = () => (dispatch) => {

    axios.get("http://localhost:5000/football/matches/live")
        .then((res) => {
                dispatch({
                    type: "live",
                    payload: res
                });
            }
        )
        .catch((err) => {
            dispatch({
                type: "UnAuthorized"
            });
        });
};

export const getOdds = () => (dispatch) => {
    axios.get("http://localhost:5000/football/matches/all")
        .then((res) => {
                dispatch({
                    type: "All",
                    payload: res
                });
            }
        )
        .catch((err) => {
            dispatch({
                type: "UnAuthorized"
            });
        });
}

export const getSingleMatchOdds = (all, match) => async (dispatch) => {
    if (all === "") {
        const inplay = await odds(match, 'inplay')
        dispatch({
            type: "singleOdd",
            payload: {inplay}
        });
    } else {
        let allMatches = all;
        let singleMatch = match;
        let matchID = '';
        await allMatches.map(item => {
            if (item.match_start.includes(singleMatch.match_date) &&
                item.home_team.name.includes(singleMatch.match_hometeam_name) &&
                item.away_team.name.includes(singleMatch.match_awayteam_name)) {
                matchID = item.match_id
            }
        })

        const prematch = await odds(matchID, 'prematch')
        const inplay = await odds(matchID, 'inplay')
        dispatch({
            type: "singleOdd",
            payload: {prematch, inplay}
        });
    }

}

async function odds(id, type) {
    const res = await axios.get(`http://localhost:5000/football/odds/${id}/${type}`);
    return res;
}