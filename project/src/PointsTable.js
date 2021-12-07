import React, {useState} from "react";
import "./App.css";
import {Col, Container, Modal, Row} from "react-bootstrap";
import Venues from "./Venues";
import down from "./down.png";
import up from "./up-arrow.png";

function PointsTable(props) {
    let ranks = {};
    let var1 = {};
    let var2 = {};
    let var3 = {};
    let name1 = {};
    let name2 = {};
    let name3 = {};
    if (props.ranking !== null) {
        ranks = props.ranking.data;
    }

    let matches = {};
    if (props.matches !== null) {
        matches = props.matches;
    }

    let allMatches = {};
    if (props.allMatches !== null) {
        allMatches = props.allMatches.data;
    }

    let preMatchOdds = {};
    if (props.preMatchOdds !== null) {
        preMatchOdds = props.preMatchOdds;
    }

    const [show, setShow] = useState(false);
    const [matchData, setmatchData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true)
        setmatchData(item)
    };

    if (Object.keys(matchData).length !== 0 && Object.keys(allMatches.data).length !== 0 && !preMatchOdds.hasOwnProperty('data')) {
        props.getSingleMatchOdds(allMatches.data, matchData);

    }

    if (preMatchOdds.hasOwnProperty('data')) {
        var1 = Object.values(preMatchOdds.data)[0]
        var2 = Object.values(preMatchOdds.data)[1]
        var3 = Object.values(preMatchOdds.data)[2]
        var1 = var1.bookmakers
        var2 = var2.bookmakers
        var3 = var3.bookmakers

        var1 = var1.slice(0, 4)
        var2 = var2.slice(0, 4)
        var3 = var3.slice(0, 4)

        name1 = Object.keys(preMatchOdds.data)[0];
        name2 = Object.keys(preMatchOdds.data)[1];
        name3 = Object.keys(preMatchOdds.data)[2];
    }

    const [more, setMore] = useState(false);

    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let currentDate = year + '-' + month + '-' + day
    let todayMatches = [];
    let d2 = '';
    let m2 = '';
    let y2 = '';

    if (matches !== {}) {
        if (currentDate in matches) {
            Object.keys(matches).map((x, ind) => {
                if (!more) {
                    if (x === currentDate) {
                        todayMatches = matches[Object.keys(matches)[ind]]
                        if (Object.keys(matches).length > ind) {
                            todayMatches = todayMatches.concat(matches[Object.keys(matches)[ind + 1]])
                        }
                    }
                } else {
                    todayMatches = todayMatches.concat(matches[Object.keys(matches)[ind]])
                }
            })
        } else {
            Object.keys(matches).map((x, ind) => {
                y2 = x.split('-')[0];
                m2 = x.split('-')[1];
                d2 = x.split('-')[2];
                if (!more) {
                    if (parseInt(y2) === year && parseInt(m2) === month && parseInt(d2) > day) {
                        todayMatches = matches[Object.keys(matches)[ind]]
                        if (Object.keys(matches).length > ind) {
                            todayMatches = todayMatches.concat(matches[Object.keys(matches)[ind + 1]])
                        }
                    }
                } else {
                    todayMatches = todayMatches.concat(matches[Object.keys(matches)[ind]])
                }
            })
        }
    }

    return (
        <div>
            <div className={'margin'} style={{display: "flex", justifyContent: "space-around", flexFlow: 'wrap'}}>
                <div style={{width: '1000px'}} className="contpoints">
                    <h1>Points Table</h1>
                    <table className="pointstable" style={{width: '100%'}}>
                        <tr>
                            <th>Pos</th>
                            <th>Club</th>
                            <th>MP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>Pts</th>
                        </tr>
                        {Object.values(ranks).map((item, ind) => {
                            return (
                                <tr>
                                    <th>{ind + 1}</th>
                                    <th><img src={item.team_badge} style={{width: '20px'}}/> {item.team_name}</th>
                                    <th>{item.overall_league_payed}</th>
                                    <th>{item.overall_league_W}</th>
                                    <th>{item.overall_league_D}</th>
                                    <th>{item.overall_league_L}</th>
                                    <th>{item.overall_league_GF}</th>
                                    <th>{item.overall_league_GA}</th>
                                    <th>{item.overall_league_PTS}</th>
                                </tr>
                            );
                        })}
                    </table>
                </div>
                <Venues venues={props.venues}/>
            </div>

            <h4 style={{textAlign: 'center'}}>Fixtures</h4>
            <div className={'margin2'} style={{display: "flex", justifyContent: "space-around", flexFlow: 'wrap'}}>
                {todayMatches.length !== 0 && todayMatches.map((item) => {
                    return (
                        <div onClick={() => {
                            handleShow(item)
                        }}>
                            <Container className="cont">
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col style={{marginTop: '5%'}}>
                                                <img src={item.team_home_badge} style={{width: '20px'}}/>
                                                {item.match_hometeam_name} : {item.match_hometeam_score} {item.hasOwnProperty('goalscorer') && item.goalscorer.length !== 0 ? item.match_hometeam_score > item.match_awayteam_score ?
                                                <span className="green"/> : <span className="red"/> : ''}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <img
                                                    src={item.team_away_badge}
                                                    style={{width: '20px'}}/> {item.match_awayteam_name} : {item.match_awayteam_score} {item.hasOwnProperty('goalscorer') && item.goalscorer.length !== 0 ? item.match_hometeam_score > item.match_awayteam_score ?
                                                <span className="red"/> : <span className="green"/> : ''}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col style={{marginTop: '5%'}}>{item.match_date}, {item.match_time}</Col>
                                        </Row>
                                        <Row>
                                            <Col>{item.match_stadium || "NA"}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    );
                })}
            </div>
            {!more ?
                <img
                    src={down}
                    alt="Avatar"
                    onClick={() => {
                        setMore(true)
                    }}
                    style={{
                        cursor: 'pointer',
                        maxWidth: '50px',
                        position: 'relative',
                        left: '50%',
                        top: '-2%',
                        padding: '0.5%',
                        backgroundColor: '#3F1052',
                        color: '#fff',
                        borderRadius: '50%'
                    }}/>
                :
                <img
                    src={up}
                    alt="Avatar"
                    onClick={() => {
                        setMore(false)
                    }}
                    style={{
                        cursor: 'pointer',
                        maxWidth: '50px',
                        position: 'relative',
                        left: '50%',
                        padding: '0.5%',
                        top: '-1%',
                        backgroundColor: '#3F1052',
                        color: '#fff',
                        borderRadius: '50%'
                    }}/>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div style={{marginLeft: 'auto'}}>
                            <img src={'https://apiv2.apifootball.com/badges/logo_leagues/148_premier-league.png'}/>
                            {matchData.country_name} {matchData.league_name}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <img
                                src={matchData.team_home_badge}
                                style={{width: '20px'}}/> {
                            matchData.match_hometeam_name}
                            {matchData.hasOwnProperty('goalscorer') && matchData.goalscorer.length !== 0 ? matchData.match_hometeam_score > matchData.match_awayteam_score ?
                                <span className="green"/> : <span className="red"/> : ''}
                        </Col>
                        <Col style={{textAlign: 'center'}}><img
                            src={matchData.team_away_badge}
                            style={{width: '20px'}}/> {matchData.match_awayteam_name}
                            {matchData.hasOwnProperty('goalscorer') && matchData.goalscorer.length !== 0 ? matchData.match_hometeam_score < matchData.match_awayteam_score ?
                                <span className="green"/> : <span className="red"/> : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>{matchData.match_hometeam_score}</Col>
                        <Col style={{textAlign: 'center'}}> {matchData.match_awayteam_score}</Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>{matchData.match_status}</Col>
                    </Row>
                    <Row>
                        {matchData.match_status === "Finished" ? <Col style={{textAlign: 'center'}}>Match was held
                            on {matchData.match_date}, {matchData.match_time} at
                            Venue: {matchData.match_stadium || "NA"}
                        </Col> : <Col style={{textAlign: 'center'}}>Match will Start
                            on {matchData.match_date}, {matchData.match_time} at
                            Venue: {matchData.match_stadium || "NA"}
                        </Col>}

                    </Row>
                    {matchData.lineup !== undefined && matchData.lineup.home.starting_lineups.length !== 0 ?
                        <div>
                            {Object.values(matchData.goalscorer).length !== 0 ?
                                <h3 style={{textAlign: 'center'}}>Goal Scorers & Time of Goal</h3> : ""}
                            <div style={{display: "flex", justifyContent: "space-around"}}>
                                <table className="pointstable" style={{backgroundColor: 'white'}}>
                                    {Object.values(matchData.goalscorer).length !== 0 && Object.values(matchData.goalscorer).map((item, ind) => {
                                        return (
                                            <tr style={{border: '0px solid white'}}>
                                                <th style={{border: '0px solid white'}}>{item.home_scorer} {item.home_scorer !== "" ? item.time : ''}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                                <table className="pointstable" style={{backgroundColor: 'white'}}>
                                    {Object.values(matchData.goalscorer).length !== 0 && Object.values(matchData.goalscorer).map((item, ind) => {
                                        return (
                                            <tr style={{border: '0px solid white'}}>
                                                <th style={{border: '0px solid white'}}>{item.away_scorer} {item.away_scorer !== "" ? item.time : ''}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                            <h3 style={{textAlign: 'center'}}>Stats</h3>
                            <div style={{display: "flex", justifyContent: "space-around"}}>
                                <table className="pointstable">
                                    <tr>
                                        <th><img
                                            src={matchData.team_home_badge}
                                            style={{width: '20px'}}/></th>
                                        <th>TEAM STATS</th>
                                        <th><img
                                            src={matchData.team_away_badge}
                                            style={{width: '20px'}}/></th>
                                    </tr>
                                    {matchData.statistics.map((item, ind) => {
                                        return (
                                            <tr>
                                                <th>{item.home}</th>
                                                <th>{item.type}</th>
                                                <th>{item.away}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                            <h3 style={{textAlign: 'center'}}>Starting lineups</h3>
                            <div style={{display: "flex", justifyContent: "space-around"}}>
                                <table className="pointstable">
                                    {Object.values(matchData.lineup.home.starting_lineups).map((item, ind) => {
                                        return (
                                            <tr>
                                                <th>{item.lineup_player}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                                <table className="pointstable">
                                    {Object.values(matchData.lineup.away.starting_lineups).map((item, ind) => {
                                        return (
                                            <tr>
                                                <th>{item.lineup_player}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                            <h3 style={{textAlign: 'center'}}>Substitutes</h3>
                            <div style={{display: "flex", justifyContent: "space-around"}}>
                                <table className="pointstable">
                                    {Object.values(matchData.lineup.home.substitutes).map((item, ind) => {
                                        return (
                                            <tr>
                                                <th>{item.lineup_player}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                                <table className="pointstable">
                                    {Object.values(matchData.lineup.away.substitutes).map((item, ind) => {
                                        return (
                                            <tr>
                                                <th>{item.lineup_player}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                            <h3 style={{textAlign: 'center'}}>Coach</h3>
                            <div style={{display: "flex", justifyContent: "space-around"}}>
                                <table className="pointstable">
                                    {Object.values(matchData.lineup.home.coach).map((item, ind) => {
                                        return (
                                            <tr>
                                                <th>{item.lineup_player}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                                <table className="pointstable">
                                    {Object.values(matchData.lineup.away.coach).map((item, ind) => {
                                        return (
                                            <tr>
                                                <th>{item.lineup_player}</th>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                        </div>
                        : ""}
                    <Row>
                        {Object.keys(var1).length === 0 ?
                            <Col style={{textAlign: 'center', marginTop: '5%'}}>Pre Match Odds Not
                                Available </Col> :
                            <div>
                                <h3 style={{textAlign: 'center'}}>Pre Match Odds Available </h3>
                                <div style={{display: 'flex', justifyContent: "space-around", flexFlow: 'wrap'}}>
                                    <div>
                                        {name1 !== "" ? <h3 style={{textAlign: 'center'}}>{name1}</h3> : ''}
                                        <table className="pointstable">
                                            <tr>
                                                <th>BookMaker Name</th>
                                                <th>Home</th>
                                                <th>Away</th>
                                                <th>Draw</th>
                                                <th>Handicap</th>
                                            </tr>
                                            {Object.keys(var1).length !== 0 && var1.map((item, ind) => {
                                                return (
                                                    <tr>
                                                        <th>{item.bookmaker_name}</th>
                                                        <th>{item.odds_data.home}</th>
                                                        <th> {item.odds_data.away}</th>
                                                        <th> {item.odds_data.draw}</th>
                                                        <th> {item.odds_data.handicap}</th>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                    </div>
                                    <div>
                                        {name2 !== "" ? <h3 style={{textAlign: 'center'}}>{name2}</h3> : ''}
                                        <table className="pointstable">
                                            <tr>
                                                <th>BookMaker Name</th>
                                                <th>Home</th>
                                                <th>Away</th>
                                                <th>Draw</th>
                                                <th>Handicap</th>
                                            </tr>
                                            {Object.keys(var2).length !== 0 && var2.map((item, ind) => {
                                                return (
                                                    <tr>
                                                        <th>{item.bookmaker_name}</th>
                                                        <th>{item.odds_data.home}</th>
                                                        <th> {item.odds_data.away}</th>
                                                        <th> {item.odds_data.draw}</th>
                                                        <th> {item.odds_data.handicap}</th>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                    </div>
                                    <div>
                                        {name3 !== "" ? <h3 style={{textAlign: 'center'}}>{name3}</h3> : ''}

                                        <table className="pointstable">
                                            <tr>
                                                <th>BookMaker Name</th>
                                                <th>Home</th>
                                                <th>Away</th>
                                                <th>Draw</th>
                                                <th>Handicap</th>
                                            </tr>
                                            {Object.keys(var3).length !== 0 && var3.map((item, ind) => {
                                                return (
                                                    <tr>
                                                        <th>{item.bookmaker_name}</th>
                                                        <th>{item.odds_data.home}</th>
                                                        <th> {item.odds_data.away}</th>
                                                        <th> {item.odds_data.draw}</th>
                                                        <th> {item.odds_data.handicap}</th>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                    </Row>
                </Modal.Body>

            </Modal>

        </div>
    );
}

export default PointsTable;
