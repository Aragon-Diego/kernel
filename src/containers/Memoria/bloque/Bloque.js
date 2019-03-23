import React from 'react';
import './Bloque.css'

const Bloque = (props) =>{
    let titulo=props.titulo;
    let contenido=props.contenido;
    if(props.titulo==="Tabla"){
        titulo=<div><p className="tit">Pag</p>
        <p className="tit">r</p>
        <p className="tit">Llegada</p>
        <p className="tit">UltAccs</p>
        <p className="tit">Accs</p>
        <p className="tit">NUR</p>
        </div>;
    }
    return(
        <div className={"Bloque "+ props.titulo}>
            <header>
                <p>{titulo}</p>
            </header>
            <section className="scroll">
                {contenido}
            </section>
        </div>
    );
};


export default Bloque;