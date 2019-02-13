import React,{Component} from 'react';
import './Bloque.css';

class BloqueN extends Component{
    render(){
        return(
            <div className="Bloque">
                <header>
                    <p>{this.props.titulo}</p>
                </header>
                <section className="Agregar">
                    <div className="Dominio">
                        <p>Nombre:</p>
                        <p>Páginas:</p>
                        <p>Ejec total:</p>
                    </div>
                    <div className="Inputs">
                        <input></input>
                        <input></input>
                        <input></input>
                    </div>
                    <button>Agregar</button>
                </section>
            </div>
        );
    }
};


export default BloqueN;
