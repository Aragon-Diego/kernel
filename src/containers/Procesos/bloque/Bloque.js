import React from 'react';
import './Bloque.css'

const Bloque = (props) =>{
    return(
        <div className="Bloque">
            <header>
                <p>{props.titulo}</p>
            </header>
            <section className="scroll">
                {props.relleno}
            </section>
        </div>
    );
};


export default Bloque;