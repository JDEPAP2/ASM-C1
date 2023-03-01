import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CurrencyRupee } from "@mui/icons-material";

const Map = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(true);
  const [currentAudio, setCurrentAudio] = useState();
  const { places, center } = props;
  const L = require("leaflet");

  const myIcon = (name) => {
    return L.icon({
      iconUrl: require(`../media/icons/${name}`),
      iconSize: [64, 88],
      iconAnchor: [32, 64],
    });
  };

  const play = (file) =>{
    const audio = new Audio(require(`../media/audio/${file}`))
    audio.loop = true;
    return audio;
  }

  useEffect(()=>{
    if(currentAudio){
      currentAudio.play()
    }
  },[currentAudio])

  return (
    <>
      <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places &&
          places.map((place, i) => {
            return (
              <div>
                <Marker
                  position={place.position}
                  icon={myIcon(place.icon)}
                  eventHandlers={{
                    click: () => {
                      setOpen(true);
                      setCurrentPlace({ ...place, i: i });
                      setCurrentAudio(play(place.audio))
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
          onClose={() => {
            setOpen(false)
            currentAudio.pause()
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          transitionDuration={800}
        >
          <div className="flex justify-between items-center">
            <div className="pt-4 pb-1">
              <h1 className="text-5xl text-center font-normal tracking-tight leading-7 md:leading-snug truncate">
                {currentPlace.name}
              </h1>
              <img
                src={require(`../media/principal/${currentPlace.main_pic}`)}
              ></img>
              {/* {navigate(`/Place/${place.id}`)} */}
            </div>
          </div>
          <div className="pb-2 flex justify-center items-center ">
            <ChevronLeft 
              color="action" 
              sx={{ fontSize: "5em" }}
              onClick = {()=> {
                let i = (currentPlace.i == 0)? places.length-1 : currentPlace.i-1;
                setCurrentPlace({...places[i], i:i})
                currentAudio.pause()
                setCurrentAudio(play(places[i].audio))
              }}/>
            <ChevronRight 
              color="action" 
              sx={{ fontSize: "5em" }}
              onClick = {()=> {
                let i = (currentPlace.i == places.length-1)? 0 : currentPlace.i+1;
                setCurrentPlace({...places[i], i:i})
                currentAudio.pause()
                setCurrentAudio(play(places[i].audio))
              }}/>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Map;
