import React from "react";
import NavBar from "./Components/NavBar";
import Map from "./Map";

const Info = (props) =>{
    const {places} = props
    return(<>
            <NavBar
                places={places}
            />
            <div>
                <h1 className="p-2 mx-5 mt-24 mb-10 text-6xl font-bold ">¿Quiénes Somos?</h1>
                <div className="flex justify-between">
                    <div className="p-10 pt-20">
                        <h1 className="text-3xl font-semibold">¿Que tanto la audición impacta en el reconocimiento de nuestro entorno?</h1>
                        <br/>
                        <br/>
                        <p className="text-lg text-justify">Pensando en ello, Estudiantes de 5° semestre de Ingeniería Multimedia de Universidad Autónoma, les traemos una propuesta innovadora para los habitantes de la ciudad de Cali.</p>
                        <br/>
                        <p className="text-lg text-justify">Este modelo prototipo parte de la primera entrega de corte del semestre 2023-01 para la materia de Arquitectura de sistemas multimedia, dirigida por el profesor Juan Vicente Pradilla Ceron.</p>
                        <br/>
                        <br/>
                        <br/>
                        <p className="text-lg text-justify">Los integrantes de este proyecto son:</p>
                        <br/>
                        <p className="text-lg text-justify">Laura Camila Riascos Hernandez</p>
                        <p className="text-lg text-justify">Julian Jair Peñaloza Chavarriaga</p>
                        <p className="text-lg text-justify">Juan Esteban Fernandez</p>
                        <p className="text-lg text-justify">Jose David Escobar Prada</p>
                    </div>
                    <img className="p-5 max-w-6xl object-cover rounded-2xl" src={require(`../media/others/team.jpg`)}></img>
                </div>
                </div>
        </>)
}
 
export default Info;