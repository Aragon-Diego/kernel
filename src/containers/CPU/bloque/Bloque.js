import React from 'react';
import './Bloque.css'

const Bloque = (props) =>{
    return(
        <div className={"Bloque "+ props.titulo}>
            <header>
                <p>{props.titulo}</p>
            </header>
            <section>
                {props.relleno}  
            </section>
        </div>
    );
};


export default Bloque;