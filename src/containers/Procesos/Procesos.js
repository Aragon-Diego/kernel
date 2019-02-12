import React from 'react';
import './Procesos.css';
import Bloque from './bloque/Bloque';
import BloqueN from './bloque/BloqueN';

const Procesos = (props) =>{
    return(
        <div className="divProcesos">
            <div className="titulo">
                <p>Procesos</p>
            </div>
            <div className="bloques">
                <BloqueN titulo="New"/>
                <Bloque titulo="Ready"/>
                <Bloque titulo="Running"/>
                <Bloque titulo="Blocked"/>
                <Bloque titulo="Finished"/>
            </div>
        </div>
    );
};


export default Procesos;