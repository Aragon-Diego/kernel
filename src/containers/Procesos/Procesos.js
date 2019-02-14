import React from 'react';
import './Procesos.css';
import Bloque from './bloque/Bloque';
import BloqueN from './bloque/BloqueN';
import Proceso from './proceso/Proceso';

const Procesos=(props)=>{
    let listo=props.listo.map((proceso,index)=>{if(index!=0){
        return(<Proceso nombre={proceso.nombre} numero={index} key={index}/>);
    }else{
        return
    }
    });
    let corriendo=props.corriendo?<Proceso nombre={props.corriendo.nombre} numero={0}/>:"";
    let bloqueados=props.bloqueados.map((proceso,index)=>{return(<Proceso nombre={proceso.nombre} numero={index} key={index}/>);});
    return(
        <div className="divProcesos">
            <div className="titulo">
                <p>Procesos</p>
            </div>
            <div className="bloques">
                <BloqueN titulo="New" agregar={props.agregar} nombre={props.nombre} pagina={props.pagina}
                ejecTotal={props.ejecTotal} nombreAuto={props.nombreAutomatico}/>
                <Bloque titulo="Ready" relleno={listo}/>
                <Bloque titulo="Running" relleno={corriendo}/>
                <Bloque titulo="Blocked" relleno={bloqueados}/>
                <Bloque titulo="Finished" relleno={props.finalizado}/>
            </div>
        </div>
    );
};


export default Procesos;
