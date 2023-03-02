import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap} from "react-leaflet"
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clear, InfoOutlined} from "@mui/icons-material";
import NavBar from "./Components/NavBar";


const Map = (props) => {
  const navigate = useNavigate();
  const { places, center } = props;
  const [open, setOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState();
  const [currentAudio, setCurrentAudio] = useState();
  const [zoom, setZoom] = useState(13);
  const [positionMap, setPositionMap] = useState(center);
  const mapRef = useRef(null)
  const L = require("leaflet");

  const myIcon = (name) => {
    return L.icon({
      iconUrl: require(`../media/icons/${name}`),
      iconSize: [64, 64],
      iconAnchor: [32, 64],
    });
  };


  const play = (file) => {
    const audio = new Audio(require(`../media/audio/${file}`));
    audio.loop = true;
    return audio;
  };

  const UpdateMap = (props)=>{
    const {zoom, position} = props
    const useComp = useMap()
    useComp.setView(position, zoom)
  }
  useEffect(()=>{
    if(currentPlace){
      setPositionMap(currentPlace.position)
    }
  },[currentPlace])

  useEffect(() => {
    if (currentAudio && currentPlace) {
      currentAudio.play();
    }
  }, [currentAudio]);

  useEffect(() => {
    if (currentAudio && currentPlace && !open) {
      setZoom(13);
      setPositionMap(center)
      currentAudio.pause();
    }
  }, [open]);

  return (
    <>
      <MapContainer minZoom={11} scrollWheelZoom={true} >
        <UpdateMap
          zoom = {zoom}
          position = {positionMap}
        />
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
                      setCurrentAudio(play(place.audio));
                      setZoom(17)
                      setPositionMap(place.position)
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
            setOpen(false);                   
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          transitionDuration={800}
        >
          <div className="p-3 pb-2 flex justify-end items-end">
            <InfoOutlined className="hover:text-gray-700" color="action" onClick={()=>{
              currentAudio.pause();
              navigate(`place/${currentPlace.id}`)
            }}/>
            <Clear color="action" className="hover:text-gray-700" onClick={()=>{setOpen(false)}}/>
          </div>
          <div className="flex justify-between items-center">
            <div className="pt-0 pb-1">
              <h1 className="text-3xl text-center font-normal tracking-tight leading-7 md:leading-snug truncate">
                {currentPlace.name}
              </h1>
              <img className="max-w-sm"
                src={require(`../media/principal/${currentPlace.main_pic}`)}
              ></img>
              {/* {navigate(`/Place/${place.id}`)} */}
            </div>
          </div>
          <div className="pb-2 flex justify-center items-center ">
            <ChevronLeft
              className="hover:text-gray-700"
              color="action"
              sx={{ fontSize: "2em" }}
              onClick={() => {
                let i = currentPlace.i === 0 ? places.length - 1 : currentPlace.i - 1;
                setCurrentPlace({ ...places[i], i: i });
                currentAudio.pause();
                setCurrentAudio(play(places[i].audio));
              }}
            />
            <ChevronRight
              className="hover:text-gray-700"
              color="action"
              sx={{ fontSize: "2em" }}
              onClick={() => {
                let i = currentPlace.i === places.length - 1 ? 0 : currentPlace.i + 1;
                setCurrentPlace({ ...places[i], i: i });
                currentAudio.pause();
                setCurrentAudio(play(places[i].audio));
              }}
            />
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Map;
