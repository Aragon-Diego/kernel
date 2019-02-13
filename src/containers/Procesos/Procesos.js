import React,{Component} from 'react';
import './Procesos.css';
import Bloque from './bloque/Bloque';
import BloqueN from './bloque/BloqueN';
import Proceso from './proceso/Proceso';
class Procesos extends Component{
    render(){
        return(
            <div className="divProcesos">
            <div className="titulo">
                <p>Procesos</p>
            </div>
            <div className="bloques">
                <BloqueN titulo="New"/>
                <Bloque titulo="Ready" relleno={[<Proceso nombre="2" numero="1"/>,<Proceso nombre="3" numero="1"/>,<Proceso nombre="4" numero="1"/>,<Proceso nombre="5" numero="1"/>,<Proceso nombre="6" numero="1"/>,<Proceso nombre="7" numero="1"/>,<Proceso nombre="8" numero="1"/>,<Proceso nombre="9" numero="1"/>,<Proceso nombre="10" numero="1"/>]}/>
                <Bloque titulo="Running" relleno={[<Proceso nombre="1" numero="0"/>,]}/>
                <Bloque titulo="Blocked" relleno={[<Proceso nombre="11" numero="2"/>,]}/>
                <Bloque titulo="Finished" relleno={[<Proceso nombre="15" numero="2"/>,]}/>
            </div>
        </div>
        );
    }
};


export default Procesos;
