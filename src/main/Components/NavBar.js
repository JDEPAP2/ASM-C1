import { ExpandLess, ExpandMore, LocationOn } from "@mui/icons-material";
import {Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";


const NavBar = (props)=>{
    const navigate = useNavigate()
    const {places, audio} = props
    const [openTab, setOpenTab] = useState(false)
    const [change, setChange] = useState(false)

    const handleClick = ()=>{
        setOpenTab(!openTab)
    }
    
    useEffect(()=>{
        if(audio){
            audio?.pause()
        }
    },[change])


    return(<>
            <div style={{zIndex:999}} className="flex justify-between p-5 absolute z-999 w-full h-16 top-0 shadow-xl bg-blue-800">
            <div>
                <small className="text-emerald-400 text-2xl font-bold">Cali</small>
                <small className="text-red-400 text-2xl font-bold">ven</small>
                <small className="text-white text-2xl font-bold">tu</small>
                <small className="text-red-400 text-2xl font-bold">ras</small>
            </div>
            <div className="flex justify-end">
                <div className="flex justify-between gap-3">
                    <p className="text-white text-[8.72] hover:text-gray-400 font-semibold mr-2" onClick={()=> {setChange(!change)
                                                                                                                    if(audio){
                                                                                                                        audio?.pause()
                                                                                                                    }
                                                                                                                navigate("../info")}}>Info</p>
                    <p className="text-white text-[8.72] hover:text-gray-400 font-semibold" onClick={()=> {setChange(!change)
                                                                                                                if(audio){
                                                                                                                    audio?.pause()
                                                                                                                }
                                                                                                                navigate("../",)}}>Mapa</p>
                    <List className="mt-0 pt-0" style={{backgroundColor: "#1E40AF"}} sx={{pt:0,mt:-1.3}}>
                        <ListItemButton onClick={()=> handleClick()} style={{backgroundColor: "#1E40AF"}}>
                            <ListItemText primary="Lugares" className="text-white"/>
                            {openTab ? <ExpandLess className="text-white"/> : <ExpandMore className="text-white"/>}
                        </ListItemButton >
                            <Collapse in={openTab} timeout="auto" unmountOnExit style={{backgroundColor: "#1E40AF"}}>
                                <List component="div" disablePadding>
                                    {places &&
                                        places.map( place =>(
                                        <ListItemButton onClick={()=>{navigate(`../place/${place.id}`)
                                                                        setChange(!change)}}>
                                            <ListItemText className="text-white font-mono" primary={`${place.name}`}/>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
                </div>
            </div>
        </div>    
    </>)
}


export default NavBar