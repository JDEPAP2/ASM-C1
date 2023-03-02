import {LocationOn } from "@mui/icons-material";
import {Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import NavBar from "./Components/NavBar";

const Place = (props) =>{
    const {id} = useParams()
    const {places} = props
    const exist = places.find(e => e.id === id);
    const [audio, setAudio] = useState()

    const redir = (url) =>{
        const a = document.createElement('a');
        a.href = url;
        a.target="_blank";
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a)
    }


    const play = (file) => {
        const audio = new Audio(require(`../media/audio/${file}`));
        audio.loop = true;
        setAudio(audio);
    };

    useEffect(()=>{
        if(audio)
        audio.play()
    },[audio])

    return(<>
            {exist &&(
                <div onLoad={()=>play(exist.audio)}>
                    <div className="flex pb-7 items-end">
                        <img className="w-screen h-[500px] object-cover object-center bg-black brightness-75" src={require(`../media/fondo/${exist.bg_pic}`)}></img>
                        <div className="absolute p-4">
                            <h1 className="text-white text-6xl font-bold ">{exist.name}</h1>
                            <div className="pt-3 px-2 flex items-start [&>*]:hover:text-gray-300" onClick={()=> redir(`${exist.url}`)}>
                                <LocationOn className="mt-1 ml-5 mr-2 text-white"/>
                                <h1 className="text-white text-2xl">{exist.address}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="px-2">
                        <div className="block justify-between">
                            <Box className="mx-20 w-s">
                                <p className="text-lg"></p>
                            </Box>
                        </div>    
                    </div>
                </div>
            )}
            <NavBar places={places} audio={audio}></NavBar>
        </>)
}
 
export default Place;