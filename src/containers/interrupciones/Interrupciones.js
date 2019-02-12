import React from 'react';
import './Interrupciones.css';
import Contador from './ContTiempo/ContTiempo';
const Interrupciones = (props) =>{
    return(
        <div className="Conten">
            <Contador tiempo={props.tiempo}/>
            <select className="select1">
                <option value="Ejecutar">Ejecutar página</option>
            </select>
            <p className="inter1">Interrupcion: </p>
            <select className="select2">
                <option value="SVC1">SVC cuantum expirado</option>
            </select>
        </div>
    );
};

export default Interrupciones;