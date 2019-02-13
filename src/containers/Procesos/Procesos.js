import React from 'react';
import './Procesos.css';
import Bloque from './bloque/Bloque';
import BloqueN from './bloque/BloqueN';
import Proceso from './proceso/Proceso';

const Procesos=(props)=>{
    let listo=props.listo.map((proceso,index)=>{return(<Proceso nombre={proceso.nombre} numero={index} key={index}/>);})
    return(
        <div className="divProcesos">
            <div className="titulo">
                <p>Procesos</p>
            </div>
            <div className="bloques">
                <BloqueN titulo="New" agregar={props.agregar} nombre={props.nombre} pagina={props.pagina}
                ejecTotal={props.ejecTotal}/>
                <Bloque titulo="Ready" relleno={listo}/>
                <Bloque titulo="Running" relleno={props.corriendo}/>
                <Bloque titulo="Blocked" relleno={props.bloqueados}/>
                <Bloque titulo="Finished" relleno={props.finalizado}/>
            </div>
        </div>
    );
};


export default Procesos;
