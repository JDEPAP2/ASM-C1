import React from "react";
import { useParams } from "react-router-dom";

const Place = (props) =>{
    const {id} = useParams()
    const {places} = props
    const exist = places.find(e => e.id === id);
    console.log(exist)
    return(<>
            {exist &&(
                <div>
                    <h1 className="text-lg">{exist.name}</h1>
                </div>
            )}
        </>)
}
 
export default Place;