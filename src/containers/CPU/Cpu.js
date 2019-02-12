import React from 'react';
import './Cpu.css';
import Bloque from './bloque/Bloque';
const Cpu = (props) =>{
    let procesoEnRunning=[<p className="relleno">Nombre: {props.proceso.nombre}</p>,
    <p className="relleno">Tpo llegada: {props.proceso.tpo}</p>,
    <p className="relleno">CPU Asignado: {props.proceso.asignado}</p>,
    <p className="relleno">Envejecimiento: {props.proceso.envejecimineto}</p>,
    <p className="relleno">CPU Restante: {props.proceso.restane}</p>,
    <p className="relleno">Quantum restante: {props.proceso.quantum}</p>
    ];
    let CPU="";
    return(
        <div className="divCpu">
            <div className="titulo">
                <p>CPU</p>
            </div>
            <div className="bloques">
                <Bloque titulo="Scheduling" relleno={procesoEnRunning}/>
                <Bloque titulo="CPU" relleno={CPU}/>
            </div>
        </div>
    );
};


export default Cpu;