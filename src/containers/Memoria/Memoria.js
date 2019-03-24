import React from 'react';
import './Memoria.css';
import Bloque from './bloque/Bloque';
import Paginas from './Paginas/Paginas';

const Procesos = (props) => {
    let paginas=props.contenido;
    if(props.contenido===null){
        paginas=[];
    }
    return ( 
        <div className="divMemoria" >
            <div className="titulo">
                <p>Memoria</p>
            </div>
            <div className="bloques">
                <Bloque titulo="Tabla" contenido={<Paginas pags={paginas}/>}/>
                <Bloque titulo="Memoria" contenido={<div className="devMemoria">
                    <select>
                        <option>
                            NUR
                        </option>
                    </select>
                    <button>Reset a bit NUR</button></div>}
                />
            </div>
        </div>
    );
};


export default Procesos;