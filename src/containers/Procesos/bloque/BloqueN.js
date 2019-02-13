import React from 'react';
import './Bloque.css';

const BloqueN = (props) =>{
    return(
        <div className="Bloque">
            <header>
                <p>{props.titulo}</p>
            </header>
            <section className="Agregar">
                <div className="Dominio">
                    <p>Nombre:</p>
                    <p>Páginas:</p>
                    <p>Ejec total:</p>
                </div>
                <div className="Inputs">
                    <input onChange={props.nombre}></input>
                    <input onChange={props.pagina}></input>
                    <input onChange={props.ejecTotal}></input>
                </div>
                <button onClick={props.agregar}>Agregar</button>
            </section>
        </div>
    );
};


export default BloqueN;

