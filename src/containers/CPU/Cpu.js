import React from 'react';
import './Cpu.css';
import Bloque from './bloque/Bloque';
const Cpu = (props) =>{
    return(
        <div className="divCpu">
            <div className="titulo">
                <p>CPU</p>
            </div>
            <div className="bloques">
                <Bloque titulo="Scheduling"/>
                <Bloque titulo="CPU"/>
            </div>
        </div>
    );
};


export default Cpu;