import PointsTable from "./PointsTable";
import React, {useState, useEffect} from "react";
import "./App.css";
import { Link } from "react-router-dom";



export default function Header() {

    return (
        
        <div className="livescore header">
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src={'https://apiv2.apifootball.com/badges/logo_leagues/148_premier-league.png'}/>
                <h3 style={{marginTop: 'auto', marginBottom: 'auto'}}>English Premier League</h3>
              
              <div style={{marginTop: 'auto', marginBottom: 'auto', paddingLeft:'55px'}}>
                <Link to="/">
                             <button style={{marginRight:"30px"}} className="btn navbar-right float-right" type="submit">
                                    Widgets
                              </button>
                </Link>
                <Link to="/Admin">
                             <button style={{marginRight:"30px"}} className="btn navbar-right float-right" type="submit">
                                    Admin
                              </button>
                </Link>
                </div>
            </div>
                <div>

            </div>
        </div>
    );
}
