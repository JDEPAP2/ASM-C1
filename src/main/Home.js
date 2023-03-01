import React, { useEffect, useState } from "react";
import Map from "./Map";

const Home = (props) =>{
    const {places} = props;
    const [center, setCenter] = useState([3.423499665982512, -76.5213865392398])

    return(<>
            <div id="map" className="">
            <Map
                center={center}
                places={places}
                />
            </div>
        </>)
}
 
export default Home;