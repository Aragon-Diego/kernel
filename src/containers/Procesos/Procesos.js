import React from 'react';
import './Procesos.css';
import Bloque from './bloque/Bloque';
import BloqueN from './bloque/BloqueN';
import Proceso from './proceso/Proceso';

const Procesos=(props)=>{
    return(
        <div className="divProcesos">
            <div className="titulo">
                <p>Procesos</p>
            </div>
            <div className="bloques">
                <BloqueN titulo="New"/>
                <Bloque titulo="Ready" relleno={props.listo}/>
                <Bloque titulo="Running" relleno={props.corriendo}/>
                <Bloque titulo="Blocked" relleno={props.bloqueados}/>
                <Bloque titulo="Finished" relleno={props.finalizado}/>
            </div>
        </div>
    );
};


export default Procesos;
