import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Map from "./Map";

const Home = (props) =>{
    const {places} = props;
    const [center, setCenter] = useState([3.423499665982512, -76.5213865392398])

    return(<>
            <NavBar
                places={places}
            />
            <div id="map" className="absolute" style={{zIndex:0}}>
            <Map
                center={center}
                places={places}
                />
            </div>
        </>)
}
 
export default Home;