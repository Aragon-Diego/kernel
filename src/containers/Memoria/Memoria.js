import React from 'react';
import './Memoria.css';
import Bloque from './bloque/Bloque';
const Procesos = (props) => {
    return ( 
        <div className="divMemoria" >
            <div className="titulo">
                <p>Memoria</p>
            </div>
            <div className="bloques">
                <Bloque titulo="Tabla"/>
                <Bloque titulo="Memoria"/>
            </div>
        </div>
    );
};


export default Procesos;