import React from 'react';
import "./Contenedor.css";
import Inter from './interrupciones/Interrupciones';
import Proces from './Procesos/Procesos';
import Cpu from './CPU/Cpu';
import Memoria from './Memoria/Memoria';
const Contenedor = (props) =>{
 return(
    <div className="Contenedor">
        <header>My little SO</header>
        <Inter tiempo="1"/>
        <Proces/>
        <Cpu/>
        <Memoria/>
    </div>  
 ); 
};


export default Contenedor;