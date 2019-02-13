import React from 'react';
import './Proceso.css';

const Proceso = (props) =>{
    let name=props.numero===0?"Proceso naranja":"Proceso";
    return(
        <div className={name}>
            <p>{props.nombre}</p>
        </div>
    );
};


export default Proceso; 