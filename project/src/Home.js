import PointsTable from "./PointsTable";
import React, {useState, useEffect} from "react";
import "./App.css";
import Graph from "./Graph";
import Venues from "./Venues";
import LiveScore from "./LiveScore";
import {getStanding, getplayers, getvenue, getMatches, getLive, getOdds, getSingleMatchOdds} from "./Redux/action";
import {connect} from "react-redux";
import Axios from 'axios';



function Home({
                  getStanding,
                  getplayers,
                  getvenue,
                  getMatches,
                  getLive,
                  getOdds,
                  getSingleMatchOdds,
                  topPlayers,
                  ranking,
                  venues,
                  matches,
                  live,
                  all,
                  preMatchOdds,
                  inPlayOdds
              }) {
        
   const [data, setData] = useState([]);

    useEffect(() => {

        getStanding();
        getplayers();
        getvenue();
        getMatches();
        getLive();
        getOdds();

        const fetchData = async () => {

            const response = await Axios.get('http://localhost:5000/comments/', {  
            })
            .catch((error) => console.log(error.resp));
             setData(response);
          };

          fetchData();
          console.log(data);

    }, []);
        console.log(data);
        
        if (data===undefined ||data.length===0)
        {
            return <div>....</div>;

        }
   else{


        return (
        <div className="livescore">
         
            <LiveScore liveScore={live} preMatchOdds={preMatchOdds} inPlayOdds={inPlayOdds}
                       getSingleMatchOdds={getSingleMatchOdds}/>
            <Graph topPlayers={topPlayers}/>
            
             <div>
                <h3 style={{textAlign: "center"}} >Live comments !</h3>
              
              <div style={{textAlign: "center"}} className="commentWrapper">
                    
                    <div  class="flex messages">
                            
                        {
                        
                        data.data.map((comment, i) => (
                            <div className="messageContent">
                                <div style={{textAlign: "left"}} className='match'>Match : {comment.matchs}</div>
                                <div style={{textAlign: "left"}} className='description'>
                                     {comment.description}
                                </div>
                                <div style={{textAlign: "right"}}>{comment.date.toString().slice(0, 10)}</div>
                            </div>
                                       ))
                       }

                    </div>
              </div>
              
              </div>

            <div>
                <PointsTable ranking={ranking} matches={matches} allMatches={all}
                             getSingleMatchOdds={getSingleMatchOdds} preMatchOdds={preMatchOdds}
                             inPlayOdds={inPlayOdds} venues={venues}/>
            </div>
        </div>
    );
}
}

const mapStateToProps = (state) => ({
    ranking: state.football.listStandings,
    topPlayers: state.football.listTopPlayers,
    venues: state.football.listVenues,
    matches: state.football.listMatches,
    live: state.football.listLiveMatches,
    all: state.football.ListAllMatches,
    preMatchOdds: state.football.prematchOdds,
    inPlayOdds: state.football.inPlayOdds,
});

export default connect(mapStateToProps, {
    getStanding,
    getplayers,
    getvenue,
    getMatches,
    getLive,
    getOdds,
    getSingleMatchOdds
})(Home);