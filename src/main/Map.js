import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const Map = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(true);
  const { places, center } = props;
  const L = require("leaflet");

  const myIcon = (name)=> {
    return L.icon({
    iconUrl: require(`../media/icons/${name}`),
    iconSize: [64, 88],
    iconAnchor: [32, 64],
  })};

  return (
    <>
      <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places &&
          places.map((place) => {
            return (
              <div>
                <Marker
                  position={place.position}
                  icon={myIcon(place.icon)}
                  eventHandlers={{
                    click: () => {
                        setOpen(true)
                        setCurrentPlace(place)
                    },
                  }}
                ></Marker>
              </div>
            );
          })}
      </MapContainer>
      {open && (
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <div className="flex justify-between items-center">
                      <div className="p-10">
                        <h1 className="text-2xl md:text-5xl font-bold tracking-tight leading-7 md:leading-snug truncate">
                          {currentPlace.name}
                        </h1>
                        <img src={require(`../media/principal/${currentPlace.main_pic}`)}></img>
                        {/* {navigate(`/Place/${place.id}`)} */}
                      </div>
                    </div>
            </Dialog>)
        }
    </>
  );
};

export default Map;
