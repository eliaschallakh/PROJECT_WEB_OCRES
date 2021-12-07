const initialState = {
    listStandings: null,
    listTopPlayers: null,
    listVenues: null,
    listMatches: null,
    listLiveMatches: null,
    ListAllMatches: null,
    prematchOdds: null,
    inPlayOdds: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case "listStanding":
            return {
                ...state,
                listStandings: action.payload,
            };

        case "topscorers":
            return {
                ...state,
                listTopPlayers: action.payload,
            };

        case "venues":
            return {
                ...state,
                listVenues: action.payload,
            };

        case "matches":
            let matchesByDate = {}
            action.payload.data.forEach((x)=>{
                if(matchesByDate.hasOwnProperty(x.match_date)){
                    matchesByDate[x.match_date].push(x)
                }
                else{
                    matchesByDate[x.match_date] = []
                    matchesByDate[x.match_date].push(x)
                }
            })
            return {
                ...state,
                listMatches: matchesByDate,
            };
        case "live":
            return {
                ...state,
                listLiveMatches: action.payload,
            };

        case "All":
            return {
                ...state,
                ListAllMatches: action.payload
            }
        case "singleOdd":
            let prematch = action.payload.hasOwnProperty('prematch') ? action.payload.prematch.data : {};
            let inplay = action.payload.inplay.data;
            return {
                ...state,
                prematchOdds: prematch,
                inPlayOdds: inplay,
            }
        default:
            return state;
    }
}