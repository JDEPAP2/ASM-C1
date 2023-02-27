import React from "react";
import Dialog from '@mui/material/Dialog';
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import { useNavigate } from "react-router-dom";


const Map = (props) => {
    const navigate = useNavigate()
    const { places, center } = props;
    const L = require('leaflet');

    const myIcon = L.icon({
        iconUrl: require('../media/Ermita.png'),
        iconSize: [64,88],
        iconAnchor: [32, 64],
    });

    return (
        <>
            <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {places && (
                    places.map((place) => {
                        return(
                        <Marker position={place.position} icon={myIcon} 
                        eventHandlers={{
                            click: () =>{
                                <Dialog>
                                    <h1 className="text-lg">{place.name}</h1>
                                    <p>Video</p>
                                    {navigate(`/Place/${place.id}`)}
                                </Dialog>
                            }
                        }}
                        >
                        </Marker>
                    )})
                )}
            </MapContainer>
        </>)
}

export default Map;