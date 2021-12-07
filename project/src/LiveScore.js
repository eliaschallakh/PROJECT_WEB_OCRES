import {Col, Container, Modal, Row} from "react-bootstrap";
import "./App.css";
import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {Carousel} from '@trendyol-js/react-carousel';

function LiveScore(props) {
    let live = {};
    if (props.liveScore !== null) {
        live = props.liveScore.data.data;
    }

    const [show, setShow] = useState(false);
    const [matchData, setmatchData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true)
        setmatchData(item)
    };

    let inPlayOdds = {};
    if (props.inPlayOdds !== null) {
        inPlayOdds = props.inPlayOdds;
    }

    if (Object.keys(matchData).length !== 0 && !inPlayOdds.hasOwnProperty('data')) {
        props.getSingleMatchOdds('', matchData.match_id);

    }

    return (
        <div className="App" style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {/*<h3>Live Scorecard</h3>*/}
            {Object.keys(live).length !== 0 && live.map((item) => {
                return (
                    <div onClick={() => {
                        handleShow(item)
                    }}>
                        {item.status_code === 1 || item.status_code === 11 || item.status_code === 12 || item.status_code === 13 || item.status_code === 14 ? (

                            <Container className="cont">
                                <Row>
                                    <Col style={{textAlign: 'center'}}><img src={item.home_team.logo}
                                                                            style={{width: '20px'}}/> {item.home_team.short_code}
                                    </Col>
                                    <Col style={{textAlign: 'center'}}><img src={item.away_team.logo}
                                                                            style={{width: '20px'}}/> {item.away_team.short_code}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{textAlign: 'center'}}>{item.stats.home_score}</Col>
                                    <Col style={{textAlign: 'center'}}> {item.stats.away_score}</Col>
                                </Row>

                                <Row>
                                    <Col style={{textAlign: 'center'}}>Time: {item.minute}</Col>
                                    <Col style={{textAlign: 'center'}}>Status: In-Progrss</Col>
                                </Row>

                                <Row>
                                    <Col style={{textAlign: 'center'}}>
                                        Venue: {item.hasOwnProperty("venue") ? item.venue.name : "NA"}
                                    </Col>
                                </Row>
                            </Container>

                        ) : (
                            ""
                        )}
                    </div>
                );
            })}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {matchData.country_name} {matchData.league_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            <img
                                src={matchData.hasOwnProperty('home_team') ? matchData.home_team.logo : ''}
                                style={{width: '20px'}}/> {
                            matchData.hasOwnProperty('home_team') ? matchData.home_team.name : ''}
                        </Col>
                        <Col style={{textAlign: 'center'}}><img
                            src={matchData.hasOwnProperty('away_team') ? matchData.away_team.logo : ''}
                            style={{width: '20px'}}/> {
                            matchData.hasOwnProperty('away_team') ? matchData.away_team.name : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            style={{textAlign: 'center'}}>{matchData.hasOwnProperty('stats') ? matchData.stats.home_score : ""}</Col>
                        <Col
                            style={{textAlign: 'center'}}>{matchData.hasOwnProperty('stats') ? matchData.stats.away_score : ""}</Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>{matchData.match_status}</Col>
                    </Row>
                    <Row>
                        <Col style={{textAlign: 'center'}}>
                            Match is being played at Venue:
                            {matchData.hasOwnProperty('venue') ? matchData.venue.name : ""}</Col>
                    </Row>
                    <Row>
                        {inPlayOdds.hasOwnProperty('data') && Object.keys(inPlayOdds.data).length === 0 ?
                            <Col style={{textAlign: 'center', marginTop: '5%'}}>In Match Odds Not
                                Available </Col> :
                            <div>
                                <h3 style={{textAlign: 'center'}}>In Match Odds Available </h3>
                                <div style={{display: 'flex', justifyContent: "space-around", flexFlow: 'wrap'}}>
                                    <div>
                                        {inPlayOdds.hasOwnProperty('data') ?
                                            <h3 style={{textAlign: 'center'}}>{Object.keys(inPlayOdds.data)[0]}</h3> : ''}
                                        <table className="pointstable">
                                            <tr>
                                                <th>BookMaker Name</th>
                                                <th>Home</th>
                                                <th>Away</th>
                                                <th>Draw</th>
                                                <th>Handicap</th>
                                            </tr>
                                            {inPlayOdds.hasOwnProperty('data') && Object.values(inPlayOdds.data)[0].bookmakers.map((item, ind) => {
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
                                        {inPlayOdds.hasOwnProperty('data') ?
                                            <h3 style={{textAlign: 'center'}}>{Object.keys(inPlayOdds.data)[1]}</h3>
                                            : ''}

                                        <table className="pointstable">
                                            <tr>
                                                <th>BookMaker Name</th>
                                                <th>Home</th>
                                                <th>Away</th>
                                                <th>Draw</th>
                                                <th>Handicap</th>
                                            </tr>
                                            {inPlayOdds.hasOwnProperty('data') && Object.values(inPlayOdds.data)[1].bookmakers.map((item, ind) => {
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
                                        {inPlayOdds.hasOwnProperty('data') ?
                                            <h3 style={{textAlign: 'center'}}>{Object.keys(inPlayOdds.data)[2]}</h3>
                                            : ''}
                                        <table className="pointstable">
                                            <tr>
                                                <th>BookMaker Name</th>
                                                <th>Home</th>
                                                <th>Away</th>
                                                <th>Draw</th>
                                                <th>Handicap</th>
                                            </tr>
                                            {inPlayOdds.hasOwnProperty('data') && Object.values(inPlayOdds.data)[2].bookmakers.map((item, ind) => {
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

export default LiveScore;
