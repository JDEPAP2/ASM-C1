import React, { useEffect, useState } from "react";
import Map from "./Map";

const Home = (props) =>{
    const {places} = props;
    const [center, setCenter] = useState([3.42158, -76.5205])

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