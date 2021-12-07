import React, {useState} from 'react';
import down from "./down.png";
import up from "./up-arrow.png";

function Venues(props) {
    let venue = {};
    const [show, setShow] = useState(false);
    if (props.venues !== null && props.venues !== undefined) {
        venue = props.venues.data.data.slice(0, 23);
    }
    if (show) {
        venue = props.venues.data.data
    }
    return (
        <div className="contpoints">
            <h1>Venues</h1>
            <table className="pointstable">
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Capacity</th>
                </tr>
                {Object.values(venue).map((item, ind) => {
                    return (
                        <>{
                            item.capacity > 19999 && ind !== 0 ?
                                <tr>
                                    <th>{item.name}</th>
                                    <th>{item.city}</th>
                                    <th>{item.capacity}</th>
                                </tr> : ""
                        }
                        </>
                    )
                })}
            </table>
            {!show ?

                <img
                    src={down}
                    onClick={() => {
                        setShow(true)
                    }}
                    style={{
                    cursor: 'pointer',
                    maxWidth: '50px',
                    position: 'relative',
                    left: '50%',
                    top: '-2%',
                    padding: '2%',
                    backgroundColor: '#3F1052',
                    color: '#fff',
                    borderRadius: '50%'
                }}/>
                :
                <img
                    src={up}
                    alt="Avatar"
                    onClick={() => {
                    setShow(false)
                }}
                    style={{
                    cursor: 'pointer',
                    maxWidth: '50px',
                    position: 'relative',
                    left: '50%',
                    padding: '2%',
                    top: '-1%',
                    backgroundColor: '#3F1052',
                    color: '#fff',
                    borderRadius: '50%'
                }}/>
            }
        </div>
    );
}

export default Venues;